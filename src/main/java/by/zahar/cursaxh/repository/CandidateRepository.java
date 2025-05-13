package by.zahar.cursaxh.repository;

import by.zahar.cursaxh.model.entity.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {}