package by.zahar.cursaxh.controllers;

import by.zahar.cursaxh.model.dto.CandidateCompetencyDTO;
import by.zahar.cursaxh.model.dto.CandidateDTO;
import by.zahar.cursaxh.service.CandidateService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidates")
@Validated
public class CandidateController {
    @Autowired
    private CandidateService candidateService;

    // Создание кандидата
    @PostMapping
    public ResponseEntity<CandidateDTO> create(@Valid @RequestBody CandidateDTO candidateDTO) {
        CandidateDTO created = candidateService.saveCandidate(candidateDTO);
        return ResponseEntity.status(201).body(created);
    }

    // Обновление кандидата
    @PutMapping("/{id}")
    public ResponseEntity<CandidateDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody CandidateDTO candidateDTO
    ) {
        candidateDTO.setId(id);
        CandidateDTO updated = candidateService.saveCandidate(candidateDTO);
        return ResponseEntity.ok(updated);
    }

    // Удаление кандидата
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        candidateService.deleteCandidate(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<CandidateDTO>> getAll() {
        List<CandidateDTO> candidates = candidateService.getAllCandidates();
        return ResponseEntity.ok(candidates);
    }

    // Получение кандидата по ID
    @GetMapping("/{id}")
    public ResponseEntity<CandidateDTO> getById(@PathVariable Long id) {
        CandidateDTO candidate = candidateService.getCandidate(id);
        return ResponseEntity.ok(candidate);
    }

    // Установка компетенций для кандидата
    @PutMapping("/{id}/competencies")
    public ResponseEntity<Void> setCompetencies(
            @PathVariable Long id,
            @Valid @RequestBody List<CandidateCompetencyDTO> competencies
    ) {
        candidateService.setCompetencies(id, competencies);
        return ResponseEntity.noContent().build();
    }
}
