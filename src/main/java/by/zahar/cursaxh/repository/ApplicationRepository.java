package by.zahar.cursaxh.repository;


import by.zahar.cursaxh.model.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    Collection<Object> findByCandidateId(Long candidateId);

    Collection<Object> findByVacancyId(Long vacancyId);
}