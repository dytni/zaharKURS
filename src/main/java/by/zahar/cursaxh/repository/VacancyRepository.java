package by.zahar.cursaxh.repository;

import by.zahar.cursaxh.model.entity.Vacancy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VacancyRepository extends JpaRepository<Vacancy, Long> {}