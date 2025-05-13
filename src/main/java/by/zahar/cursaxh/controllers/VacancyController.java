package by.zahar.cursaxh.controllers;

import by.zahar.cursaxh.model.dto.VacancyCompetencyDTO;
import by.zahar.cursaxh.model.dto.VacancyDTO;
import by.zahar.cursaxh.service.VacancyService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vacancies")
@Validated
public class VacancyController {
    @Autowired
    private VacancyService vacancyService;

    // Создание вакансии
    @PostMapping
    public ResponseEntity<VacancyDTO> create(@Valid @RequestBody VacancyDTO vacancyDTO) {
        VacancyDTO created = vacancyService.saveVacancy(vacancyDTO);
        return ResponseEntity.status(201).body(created);
    }

    // Обновление вакансии
    @PutMapping("/{id}")
    public ResponseEntity<VacancyDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody VacancyDTO vacancyDTO
    ) {
        vacancyDTO.setId(id);
        VacancyDTO updated = vacancyService.saveVacancy(vacancyDTO);
        return ResponseEntity.ok(updated);
    }

    // Удаление вакансии
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        vacancyService.deleteVacancy(id);
        return ResponseEntity.noContent().build();
    }

    // Получение всех вакансий
    @GetMapping
    public ResponseEntity<List<VacancyDTO>> getAll() {
        List<VacancyDTO> vacancies = vacancyService.getAllVacancies();
        return ResponseEntity.ok(vacancies);
    }

    // Получение вакансии по ID
    @GetMapping("/{id}")
    public ResponseEntity<VacancyDTO> getById(@PathVariable Long id) {
        VacancyDTO vacancy = vacancyService.getVacancy(id);
        return ResponseEntity.ok(vacancy);
    }

    // Установка требований для вакансии
    @PutMapping("/{id}/requirements")
    public ResponseEntity<Void> setRequirements(
            @PathVariable Long id,
            @Valid @RequestBody List<VacancyCompetencyDTO> requirements
    ) {
        vacancyService.setRequirements(id, requirements);
        return ResponseEntity.noContent().build();
    }
}
