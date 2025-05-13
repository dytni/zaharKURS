package by.zahar.cursaxh.service;

import by.zahar.cursaxh.model.dto.VacancyCompetencyDTO;
import by.zahar.cursaxh.model.dto.VacancyDTO;
import by.zahar.cursaxh.model.entity.Vacancy;
import by.zahar.cursaxh.model.entity.VacancyCompetency;
import by.zahar.cursaxh.model.enums.VacancyStatus;
import by.zahar.cursaxh.model.keys.VacancyCompetencyPK;
import by.zahar.cursaxh.repository.VacancyCompetencyRepository;
import by.zahar.cursaxh.repository.VacancyRepository;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VacancyService {
    @Autowired
    private VacancyRepository vacancyRepo;
    @Autowired
    private VacancyCompetencyRepository vcRepo;
    @Autowired
    private ModelMapper modelMapper;

    // Закрыть вакансию
//    @Transactional
    public void closeVacancy(Long vacancyId) {
        Vacancy vacancy = vacancyRepo.findById(vacancyId)
                .orElseThrow(() -> new RuntimeException("Вакансия не найдена"));
        vacancy.setStatus(VacancyStatus.CLOSED);
        vacancyRepo.save(vacancy);
    }

    // Поиск вакансии
    public Vacancy findById(Long id) {
        return vacancyRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Вакансия не найдена"));
    }

    // Сохранение/обновление вакансии
//    @Transactional
    public VacancyDTO saveVacancy(@Valid VacancyDTO vacancyDTO) {
        Vacancy vacancy = modelMapper.map(vacancyDTO, Vacancy.class);
        if (vacancy.getId() == null) {
            vacancy.setPublishedAt(LocalDateTime.now());
        }
        vacancy = vacancyRepo.save(vacancy);
        return modelMapper.map(vacancy, VacancyDTO.class);
    }

    // Удаление вакансии
//    @Transactional
    public void deleteVacancy(Long id) {
        vacancyRepo.deleteById(id);
    }

    // Получение всех вакансий
    public List<VacancyDTO> getAllVacancies() {
        return vacancyRepo.findAll().stream()
                .map(v -> modelMapper.map(v, VacancyDTO.class))
                .collect(Collectors.toList());
    }

    // Получение вакансии по ID
    public VacancyDTO getVacancy(Long id) {
        Vacancy vacancy = findById(id);
        return modelMapper.map(vacancy, VacancyDTO.class);
    }

    // Установка требований к вакансии
//    @Transactional
    public void setRequirements(Long id, @Valid List<VacancyCompetencyDTO> requirements) {
        Vacancy vacancy = findById(id);

        // Удалить старые требования
        vcRepo.deleteByVacancyId(id);

        // Сохранить новые требования
        List<VacancyCompetency> entities = requirements.stream()
                .map(dto -> {
                    VacancyCompetency vc = new VacancyCompetency();
                    vc.setId(new VacancyCompetencyPK(id, dto.getCompetencyId()));
                    vc.setRequiredLevel(dto.getLevel());
                    return vc;
                })
                .collect(Collectors.toList());
        vcRepo.saveAll(entities);
    }
}