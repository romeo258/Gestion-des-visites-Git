package com.test.gestionVisite.Repository;

import com.test.gestionVisite.Entity.Visit;
import com.test.gestionVisite.Entity.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VisitRepo extends JpaRepository<Visit, Long> {
    Optional<Visit> findVisitByVisitCode(Long visitCode);

    void deleteVisitByVisitCode(Long visitCode);

    List<Visit> findVisitByPurposeContaining(String purpose);
}
