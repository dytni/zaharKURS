package by.zahar.cursaxh.repository;


import by.zahar.cursaxh.model.entity.Candidate;
import by.zahar.cursaxh.model.entity.CandidateCompetency;
import by.zahar.cursaxh.model.keys.CandidateCompetencyPK;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CandidateCompetencyRepository extends JpaRepository<CandidateCompetency, CandidateCompetencyPK> {
    List<CandidateCompetency> findByCandidateId(Long candidateId);

    List<CandidateCompetency> findByCandidate(Candidate candidate);

    void deleteByCandidateId(Long candidateId);
}