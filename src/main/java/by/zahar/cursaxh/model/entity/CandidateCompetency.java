package by.zahar.cursaxh.model.entity;
import by.zahar.cursaxh.model.keys.CandidateCompetencyPK;
import jakarta.persistence.*;
import lombok.*;


@Data
@Entity
@Table(name = "candidate_competency")
public class CandidateCompetency {
    @EmbeddedId
    private CandidateCompetencyPK id;

    private Integer assessedLevel;

    @MapsId("candidateId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "candidate_id")
    private Candidate candidate;

    @MapsId("competencyId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "competency_id")
    private Competency competency;

    public CandidateCompetencyPK getId() {
        return id;
    }

    public void setId(CandidateCompetencyPK id) {
        this.id = id;
    }

    public Integer getAssessedLevel() {
        return assessedLevel;
    }

    public void setAssessedLevel(Integer assessedLevel) {
        this.assessedLevel = assessedLevel;
    }

    public Candidate getCandidate() {
        return candidate;
    }

    public void setCandidate(Candidate candidate) {
        this.candidate = candidate;
    }

    public Competency getCompetency() {
        return competency;
    }

    public void setCompetency(Competency competency) {
        this.competency = competency;
    }
}