package by.zahar.cursaxh.model.keys;

import jakarta.persistence.Embeddable;
import lombok.Data;


import java.io.Serializable;

@Embeddable
@Data
public class CandidateCompetencyPK implements Serializable {
    private Long candidateId;
    private Long competencyId;

    // Добавьте конструктор с параметрами
    public CandidateCompetencyPK(Long candidateId, Long competencyId) {
        this.candidateId = candidateId;
        this.competencyId = competencyId;
    }

    public CandidateCompetencyPK() {

    }

    public Long getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(Long candidateId) {
        this.candidateId = candidateId;
    }

    public Long getCompetencyId() {
        return competencyId;
    }

    public void setCompetencyId(Long competencyId) {
        this.competencyId = competencyId;
    }
}