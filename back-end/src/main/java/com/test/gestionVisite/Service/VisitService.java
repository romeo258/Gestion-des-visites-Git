package com.test.gestionVisite.Service;

import com.test.gestionVisite.Entity.Visit;
import com.test.gestionVisite.Entity.Visitor;
import com.test.gestionVisite.Exception.VisitNotFoundException;
import com.test.gestionVisite.Exception.VisitorNotFoundException;
import com.test.gestionVisite.Repository.VisitRepo;
import com.test.gestionVisite.Repository.VisitorRepo;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class VisitService {
    private final VisitRepo visitRepo;

    public Visit addVisit(Visit visit){
        return visitRepo.save(visit);
    }

    public List<Visit> findAllVisits(){
        return visitRepo.findAll();
    }

    public Visit updateVisit(Visit visit){
        return visitRepo.save(visit);
    }

    public Visit findByVisitCode(Long visitCode){
        return visitRepo.findVisitByVisitCode(visitCode)
                .orElseThrow(()->new VisitNotFoundException("Visite numero " + visitCode + " n'a pas été trouver"));
    }

    @Transactional
    public void deleteVisitByVisitCode(Long visitCode){
        visitRepo.deleteVisitByVisitCode(visitCode);
    }

    @Transactional
    public Visit updateVisit(Long visitCode, Visit updatedVisitData) {
        // Vérifiez si la visit existe
        Visit existingVisit = visitRepo.findVisitByVisitCode(visitCode)
                .orElseThrow(() -> new VisitNotFoundException("La Visite avec l'ID " + visitCode + " non trouvée"));

        // Mettez à jour les propriétés du visiteur existant avec les nouvelles données
        existingVisit.setPurpose(updatedVisitData.getPurpose());
        existingVisit.setDate(updatedVisitData.getDate());
        existingVisit.setDepartureDate(updatedVisitData.getDepartureDate());
        existingVisit.setVisitor(updatedVisitData.getVisitor());
//        existingVisit.setAddress(updatedVisitorData.getAddress()); //destiner au user

        // Sauvegardez le visiteur mis à jour dans la base de données
        return visitRepo.save(existingVisit);
    }
}
