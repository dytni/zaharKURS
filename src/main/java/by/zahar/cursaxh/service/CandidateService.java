package by.zahar.cursaxh.service;

import by.zahar.cursaxh.model.dto.CandidateCompetencyDTO;
import by.zahar.cursaxh.model.dto.CandidateDTO;
import by.zahar.cursaxh.model.entity.Candidate;
import by.zahar.cursaxh.model.entity.CandidateCompetency;
import by.zahar.cursaxh.model.entity.Competency;
import by.zahar.cursaxh.model.keys.CandidateCompetencyPK;
import by.zahar.cursaxh.repository.CandidateCompetencyRepository;
import by.zahar.cursaxh.repository.CandidateRepository;
import by.zahar.cursaxh.repository.CompetencyRepository; // Добавлено
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CandidateService {
    @Autowired
    private CandidateRepository candidateRepo;
    @Autowired
    private CandidateCompetencyRepository ccRepo;
    @Autowired
    private CompetencyRepository competencyRepo; // Добавлено
    @Autowired
    private ModelMapper modelMapper;

    // Создание/обновление кандидата
    public CandidateDTO saveCandidate(CandidateDTO dto) {
        Candidate candidate = modelMapper.map(dto, Candidate.class);
        candidate.setCreatedAt(LocalDateTime.now());
        return modelMapper.map(candidateRepo.save(candidate), CandidateDTO.class);
    }

    // Удаление кандидата
    public void deleteCandidate(Long id) {
        candidateRepo.deleteById(id);
    }

    // Установка компетенций кандидата
    @Transactional
    public void setCompetencies(Long candidateId, List<CandidateCompetencyDTO> dtos) {
        ccRepo.deleteByCandidateId(candidateId);

        Candidate candidate = candidateRepo.findById(candidateId)
                .orElseThrow(() -> new RuntimeException("Кандидат не найден"));

        List<CandidateCompetency> entities = dtos.stream()
                .map(dto -> {
                    Competency competency = competencyRepo.findById(dto.getCompetencyId())
                            .orElseThrow(() -> new RuntimeException("Компетенция не найдена"));

                    CandidateCompetency cc = new CandidateCompetency();
                    cc.setCandidate(candidate); // ← Добавьте это
                    cc.setCompetency(competency); // ← И это
                    cc.setAssessedLevel(dto.getLevel());
                    return cc;
                })
                .collect(Collectors.toList());

        ccRepo.saveAll(entities);
    }

    // Поиск кандидата по ID
    public CandidateDTO getCandidate(Long id) {
        return candidateRepo.findById(id)
                .map(c -> modelMapper.map(c, CandidateDTO.class))
                .orElseThrow(() -> new RuntimeException("Кандидат не найден"));
    }

    // Получить всех кандидатов
    public List<CandidateDTO> getAllCandidates() {
        return candidateRepo.findAll().stream()
                .map(c -> modelMapper.map(c, CandidateDTO.class))
                .collect(Collectors.toList());
    }

    public Candidate findById(Long candidateId) {
        return candidateRepo.findById(candidateId).orElseThrow(EntityNotFoundException::new);
    }
}