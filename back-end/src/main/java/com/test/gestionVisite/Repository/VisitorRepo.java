package com.test.gestionVisite.Repository;

import com.test.gestionVisite.Entity.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VisitorRepo extends JpaRepository<Visitor, Long> {

    Optional<Visitor> findVisitorByVisitorId(Long visitorId);

    void deleteVisitorByVisitorId(Long visitorId);

    List<Visitor> findVisitorByLastNameContaining(String lastName);
}

