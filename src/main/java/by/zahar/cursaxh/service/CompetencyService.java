// service/CompetencyService.java
package by.zahar.cursaxh.service;

import by.zahar.cursaxh.model.dto.CompetencyDTO;
import by.zahar.cursaxh.model.entity.Competency;
import by.zahar.cursaxh.repository.CompetencyRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CompetencyService {
    @Autowired
    private CompetencyRepository competencyRepo;
    @Autowired
    private ModelMapper modelMapper;

    // Получение всех компетенций
    public List<CompetencyDTO> getAllCompetencies() {
        return competencyRepo.findAll().stream()
                .map(c -> modelMapper.map(c, CompetencyDTO.class))
                .collect(Collectors.toList());
    }

    // Получение компетенции по ID
    public CompetencyDTO getCompetencyById(Long id) {
        Competency competency = competencyRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Компетенция не найдена"));
        return modelMapper.map(competency, CompetencyDTO.class);
    }

    // Создание компетенции
    @Transactional
    public CompetencyDTO createCompetency(CompetencyDTO dto) {
        Competency entity = modelMapper.map(dto, Competency.class);
        Competency saved = competencyRepo.save(entity);
        return modelMapper.map(saved, CompetencyDTO.class);
    }

    // Обновление компетенции
    @Transactional
    public CompetencyDTO updateCompetency(Long id, CompetencyDTO dto) {
        Competency existing = competencyRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Компетенция не найдена"));

        modelMapper.map(dto, existing); // Обновляем поля
        Competency updated = competencyRepo.save(existing);
        return modelMapper.map(updated, CompetencyDTO.class);
    }

    // Удаление компетенции
    @Transactional
    public void deleteCompetency(Long id) {
        competencyRepo.deleteById(id);
    }
}