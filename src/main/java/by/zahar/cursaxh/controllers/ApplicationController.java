package by.zahar.cursaxh.controllers;

import by.zahar.cursaxh.model.dto.ApplicationResponseDTO;
import by.zahar.cursaxh.model.enums.ApplicationStatus;
import by.zahar.cursaxh.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
@Validated
public class ApplicationController {
    @Autowired
    private ApplicationService applicationService;

    // Подача заявки
    @PostMapping
    public ResponseEntity<ApplicationResponseDTO> apply(
            @RequestParam Long candidateId,
            @RequestParam Long vacancyId
    ) {
        ApplicationResponseDTO response = applicationService.createApplication(candidateId, vacancyId);
        return ResponseEntity.status(201).body(response);
    }

    // Обновление статуса заявки
    @PutMapping("/{id}/status")
    public ResponseEntity<ApplicationResponseDTO> updateStatus(
            @PathVariable Long id,
            @RequestParam("newStatus") String newStatus
    ) {
        ApplicationResponseDTO updated = applicationService.updateStatus(id, ApplicationStatus.valueOf(newStatus));
        return ResponseEntity.ok(updated);
    }

    // Удаление заявки
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        applicationService.deleteApplication(id);
        return ResponseEntity.noContent().build();
    }

    // Получение всех заявок
    @GetMapping
    public ResponseEntity<List<ApplicationResponseDTO>> getAll() {
        List<ApplicationResponseDTO> applications = applicationService.getAllApplications();
        return ResponseEntity.ok(applications);
    }
    @GetMapping
    public ResponseEntity<List<ApplicationResponseDTO>> getMy(@RequestParam String username) {
        List<ApplicationResponseDTO> applications = applicationService.getMyApplications();
        return ResponseEntity.ok(applications);
    }

    // Получение заявки по ID
    @GetMapping("/{id}")
    public ResponseEntity<ApplicationResponseDTO> getById(@PathVariable Long id) {
        ApplicationResponseDTO application = applicationService.getApplicationById(id);
        return ResponseEntity.ok(application);
    }

    // Получение заявок по кандидату
    @GetMapping("/candidate/{candidateId}")
    public ResponseEntity<List<ApplicationResponseDTO>> getByCandidate(
            @PathVariable Long candidateId
    ) {
        List<ApplicationResponseDTO> apps = applicationService.getApplicationsByCandidateId(candidateId);
        return ResponseEntity.ok(apps);
    }

    // Получение заявок по вакансии
    @GetMapping("/vacancy/{vacancyId}")
    public ResponseEntity<List<ApplicationResponseDTO>> getByVacancy(
            @PathVariable Long vacancyId
    ) {
        List<ApplicationResponseDTO> apps = applicationService.getApplicationsByVacancyId(vacancyId);
        return ResponseEntity.ok(apps);
    }
}