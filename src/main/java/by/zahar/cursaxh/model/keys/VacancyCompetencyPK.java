package by.zahar.cursaxh.model.keys;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serializable;

@Embeddable
@Data
public class VacancyCompetencyPK implements Serializable {
    @Column(name = "vacancy_id")
    private Long vacancyId;

    @Column(name = "competency_id")
    private Long competencyId;

    public VacancyCompetencyPK(Long vacancyId, Long competencyId) {
        this.vacancyId = vacancyId;
        this.competencyId = competencyId;
    }

    public VacancyCompetencyPK() {

    }

    public Long getVacancyId() {
        return vacancyId;
    }

    public void setVacancyId(Long vacancyId) {
        this.vacancyId = vacancyId;
    }

    public Long getCompetencyId() {
        return competencyId;
    }

    public void setCompetencyId(Long competencyId) {
        this.competencyId = competencyId;
    }
}
