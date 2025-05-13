package by.zahar.cursaxh.model.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ApplicationResponseDTO {
    private Long id;

    @NotNull(message = "ID кандидата не может быть пустым")
    private Long candidateId;

    @NotNull(message = "ID вакансии не может быть пустым")
    private Long vacancyId;

    @NotNull(message = "Дата подачи не может быть пустой")
    private LocalDateTime applicationDate;

    @NotNull(message = "Статус не может быть пустым")
    private String status;

    @Min(0) @NotNull(message = "Total score не может быть пустым")
    private Double totalScore;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public @NotNull(message = "ID кандидата не может быть пустым") Long getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(@NotNull(message = "ID кандидата не может быть пустым") Long candidateId) {
        this.candidateId = candidateId;
    }

    public @NotNull(message = "ID вакансии не может быть пустым") Long getVacancyId() {
        return vacancyId;
    }

    public void setVacancyId(@NotNull(message = "ID вакансии не может быть пустым") Long vacancyId) {
        this.vacancyId = vacancyId;
    }

    public @NotNull(message = "Дата подачи не может быть пустой") LocalDateTime getApplicationDate() {
        return applicationDate;
    }

    public void setApplicationDate(@NotNull(message = "Дата подачи не может быть пустой") LocalDateTime applicationDate) {
        this.applicationDate = applicationDate;
    }

    public @NotNull(message = "Статус не может быть пустым") String getStatus() {
        return status;
    }

    public void setStatus(@NotNull(message = "Статус не может быть пустым") String status) {
        this.status = status;
    }

    public @Min(0) @NotNull(message = "Total score не может быть пустым") Double getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(@Min(0) @NotNull(message = "Total score не может быть пустым") Double totalScore) {
        this.totalScore = totalScore;
    }
}