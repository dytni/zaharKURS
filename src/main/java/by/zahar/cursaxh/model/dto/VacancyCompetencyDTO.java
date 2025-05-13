package by.zahar.cursaxh.model.dto;


import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class VacancyCompetencyDTO {
    @NotNull(message = "ID компетенции не может быть пустым")
    private Long competencyId;

    @Min(1) @Max(5)
    private Integer level;

    public @NotNull(message = "ID компетенции не может быть пустым") Long getCompetencyId() {
        return competencyId;
    }

    public void setCompetencyId(@NotNull(message = "ID компетенции не может быть пустым") Long competencyId) {
        this.competencyId = competencyId;
    }

    public @Min(1) @Max(5) Integer getLevel() {
        return level;
    }

    public void setLevel(@Min(1) @Max(5) Integer level) {
        this.level = level;
    }
}