package by.zahar.cursaxh.model.entity;

import by.zahar.cursaxh.model.keys.VacancyCompetencyPK;
import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
@Table(name = "vacancy_competency")
public class VacancyCompetency {
    @EmbeddedId
    private VacancyCompetencyPK id;

    private Integer requiredLevel;

    @MapsId("vacancyId")
    @ManyToOne
    @JoinColumn(name = "vacancy_id")
    private Vacancy vacancy;

    @MapsId("competencyId")
    @ManyToOne
    @JoinColumn(name = "competency_id")
    private Competency competency;

    public VacancyCompetencyPK getId() {
        return id;
    }

    public void setId(VacancyCompetencyPK id) {
        this.id = id;
    }

    public Integer getRequiredLevel() {
        return requiredLevel;
    }

    public void setRequiredLevel(Integer requiredLevel) {
        this.requiredLevel = requiredLevel;
    }

    public Vacancy getVacancy() {
        return vacancy;
    }

    public void setVacancy(Vacancy vacancy) {
        this.vacancy = vacancy;
    }

    public Competency getCompetency() {
        return competency;
    }

    public void setCompetency(Competency competency) {
        this.competency = competency;
    }
}