package by.zahar.cursaxh.repository;


import by.zahar.cursaxh.model.entity.Vacancy;
import by.zahar.cursaxh.model.entity.VacancyCompetency;
import by.zahar.cursaxh.model.keys.VacancyCompetencyPK;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VacancyCompetencyRepository extends JpaRepository<VacancyCompetency, VacancyCompetencyPK> {
    List<VacancyCompetency> findByVacancyId(Long vacancyId);

    List<VacancyCompetency> findByVacancy(Vacancy vacancy);

    void deleteByVacancyId(Long id);
}