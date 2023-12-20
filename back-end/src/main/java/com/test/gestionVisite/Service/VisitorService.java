package com.test.gestionVisite.Service;


import com.test.gestionVisite.Entity.Visitor;
import com.test.gestionVisite.Exception.VisitorNotFoundException;
import com.test.gestionVisite.Repository.VisitorRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VisitorService {

    private final VisitorRepo visitorRepo;

    @Autowired
    public VisitorService(VisitorRepo visitorRepo){
        this.visitorRepo = visitorRepo;
    }
    public Visitor addVisitor(Visitor visitor){
        return visitorRepo.save(visitor);
    }

    public List<Visitor> findAllVisitors(){
        return visitorRepo.findAll();
    }

    public Visitor updateVisitor(Visitor visitor){
        return visitorRepo.save(visitor);
    }

    public Visitor findByVisitorId(Long visitorId){
        return visitorRepo.findVisitorByVisitorId(visitorId)
                .orElseThrow(()->new VisitorNotFoundException("Visiteur numero " + visitorId + " n'a pas été trouver"));
    }

    @Transactional
    public void deleteVisitorByVisitorId(Long visitorId){
        visitorRepo.deleteVisitorByVisitorId(visitorId);
    }

    @Transactional
    public Visitor updateVisitor(Long visitorId, Visitor updatedVisitorData) {
        // Vérifiez si le visiteur existe
        Visitor existingVisitor = visitorRepo.findVisitorByVisitorId(visitorId)
                .orElseThrow(() -> new VisitorNotFoundException("Visiteur avec l'ID " + visitorId + " non trouvé"));

        // Mettez à jour les propriétés du visiteur existant avec les nouvelles données
        existingVisitor.setFirstName(updatedVisitorData.getFirstName());
        existingVisitor.setLastName(updatedVisitorData.getLastName());
        existingVisitor.setEmail(updatedVisitorData.getEmail());
        existingVisitor.setPhone(updatedVisitorData.getPhone());
        existingVisitor.setAddress(updatedVisitorData.getAddress());

        // Sauvegardez le visiteur mis à jour dans la base de données
        return visitorRepo.save(existingVisitor);
    }
}
