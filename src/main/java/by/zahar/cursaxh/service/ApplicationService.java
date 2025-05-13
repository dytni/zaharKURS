package by.zahar.cursaxh.service;

import by.zahar.cursaxh.model.dto.ApplicationResponseDTO;
import by.zahar.cursaxh.model.entity.*;
import by.zahar.cursaxh.model.enums.ApplicationStatus;
import by.zahar.cursaxh.model.enums.VacancyStatus;
import by.zahar.cursaxh.repository.ApplicationRepository;
import by.zahar.cursaxh.repository.CandidateCompetencyRepository;
import by.zahar.cursaxh.repository.VacancyCompetencyRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ApplicationService {
    @Autowired
    private ApplicationRepository applicationRepo;
    @Autowired
    private VacancyService vacancyService;
    @Autowired
    private CandidateService candidateService;
    @Autowired
    private CandidateCompetencyRepository ccRepo;
    @Autowired
    private VacancyCompetencyRepository vcRepo;
    @Autowired
    private ModelMapper modelMapper;

    // Создание заявки
//    @Transactional
    public ApplicationResponseDTO createApplication(Long candidateId, Long vacancyId) {
        // Проверка существования
        Candidate candidate = candidateService.findById(candidateId);
        Vacancy vacancy = vacancyService.findById(vacancyId);

        // Проверка статуса вакансии
        if (!vacancy.getStatus().equals(VacancyStatus.OPEN)) {
            throw new IllegalArgumentException("Вакансия уже закрыта");
        }

        // Рассчитать totalScore
        double totalScore = calculateScore(candidate, vacancy);

        // Создать заявку
        Application application = new Application();
        application.setCandidate(candidate);
        application.setVacancy(vacancy);
        application.setApplicationDate(LocalDateTime.now());
        application.setStatus(ApplicationStatus.PROCESSING);
        application.setTotalScore(totalScore);

        Application saved = applicationRepo.save(application);
        return modelMapper.map(saved, ApplicationResponseDTO.class);
    }

    // Обновление статуса заявки
//    @Transactional
    public ApplicationResponseDTO updateStatus(Long appId, ApplicationStatus newStatus) {
        Application application = applicationRepo.findById(appId)
                .orElseThrow(() -> new RuntimeException("Заявка не найдена"));

        // Сохранить предыдущий статус
        ApplicationStatus oldStatus = application.getStatus();

        // Изменить статус
        application.setStatus(newStatus);
        Application updated = applicationRepo.save(application);

        // Если заявка принята, закрыть вакансию
        if (newStatus == ApplicationStatus.ACCEPTED && oldStatus != newStatus) {
            vacancyService.closeVacancy(application.getVacancy().getId());
        }

        return modelMapper.map(updated, ApplicationResponseDTO.class);
    }

    // Рассчет совпадения компетенций
    private double calculateScore(Candidate candidate, Vacancy vacancy) {
        List<CandidateCompetency> candidateSkills = ccRepo.findByCandidate(candidate);
        List<VacancyCompetency> vacancyRequirements = vcRepo.findByVacancy(vacancy);

        if (vacancyRequirements.isEmpty()) return 0.0;

        Map<Long, Integer> requiredLevels = vacancyRequirements.stream()
                .collect(Collectors.toMap(
                        vc -> vc.getCompetency().getId(),
                        VacancyCompetency::getRequiredLevel
                ));

        double sum = 0.0;
        int count = 0;
        for (CandidateCompetency cc : candidateSkills) {
            Long competencyId = cc.getCompetency().getId();
            if (requiredLevels.containsKey(competencyId)) {
                int requiredLevel = requiredLevels.get(competencyId);
                int assessedLevel = cc.getAssessedLevel();
                sum += (double) assessedLevel / requiredLevel;
                count++;
            }
        }

        // Ограничение до 100%
        double score = (count == 0) ? 0.0 : (sum / count) * 100;
        return Math.min(score, 100.0);
    }

    // Удаление заявки
//    @Transactional
    public void deleteApplication(Long id) {
        applicationRepo.deleteById(id);
    }

    // Получение всех заявок
    public List<ApplicationResponseDTO> getAllApplications() {
        return applicationRepo.findAll().stream()
                .map(a -> modelMapper.map(a, ApplicationResponseDTO.class))
                .collect(Collectors.toList());
    }

    // Получение заявки по ID
    public ApplicationResponseDTO getApplicationById(Long id) {
        Application application = applicationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Заявка не найдена"));
        return modelMapper.map(application, ApplicationResponseDTO.class);
    }

    // Получение заявок по кандидату
    public List<ApplicationResponseDTO> getApplicationsByCandidateId(Long candidateId) {
        return applicationRepo.findByCandidateId(candidateId).stream()
                .map(a -> modelMapper.map(a, ApplicationResponseDTO.class))
                .collect(Collectors.toList());
    }

    // Получение заявок по вакансии
    public List<ApplicationResponseDTO> getApplicationsByVacancyId(Long vacancyId) {
        return applicationRepo.findByVacancyId(vacancyId).stream()
                .map(a -> modelMapper.map(a, ApplicationResponseDTO.class))
                .collect(Collectors.toList());
    }
}