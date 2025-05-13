package by.zahar.cursaxh.controllers;

import by.zahar.cursaxh.model.dto.CompetencyDTO;
import by.zahar.cursaxh.service.CompetencyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/competencies")
public class CompetencyController {
    @Autowired
    private CompetencyService competencyService;

    // Получение всех компетенций
    @GetMapping
    public ResponseEntity<List<CompetencyDTO>> getAll() {
        List<CompetencyDTO> competencies = competencyService.getAllCompetencies();
        return ResponseEntity.ok(competencies);
    }

    // Получение компетенции по ID
    @GetMapping("/{id}")
    public ResponseEntity<CompetencyDTO> getById(@PathVariable Long id) {
        CompetencyDTO competency = competencyService.getCompetencyById(id);
        return ResponseEntity.ok(competency);
    }

    // Создание компетенции
    @PostMapping
    public ResponseEntity<CompetencyDTO> create(@RequestBody CompetencyDTO dto) {
        CompetencyDTO created = competencyService.createCompetency(dto);
        return ResponseEntity.status(201).body(created);
    }

    // Обновление компетенции
    @PutMapping("/{id}")
    public ResponseEntity<CompetencyDTO> update(
            @PathVariable Long id,
            @RequestBody CompetencyDTO dto
    ) {
        CompetencyDTO updated = competencyService.updateCompetency(id, dto);
        return ResponseEntity.ok(updated);
    }

    // Удаление компетенции
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        competencyService.deleteCompetency(id);
        return ResponseEntity.noContent().build();
    }
}