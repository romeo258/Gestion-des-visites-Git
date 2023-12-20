package com.test.gestionVisite.Controller;

import com.test.gestionVisite.Entity.Visitor;
import com.test.gestionVisite.Service.VisitorService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/visitor")
public class VisitorController {

    //instanciation de notre service
    private final VisitorService visitorService;

    //afficher tous les visiteurs
//    @CrossOrigin
    @GetMapping("/all")
    public ResponseEntity<List<Visitor>> getAllVisitors(){
        List<Visitor> visitors = visitorService.findAllVisitors();
        return new ResponseEntity<>(visitors, HttpStatus.OK);
    }

    //Rechercher un visiteur à partir de son identifiant
//    @CrossOrigin
    @GetMapping("/find/{visitorId}")
    public ResponseEntity<Visitor> getVisitorByVisitorId(@PathVariable("visitorId") Long visitorId){
        Visitor visitor = visitorService.findByVisitorId(visitorId);
        return new ResponseEntity<>(visitor, HttpStatus.OK);
    }

    //Ajouter un nouveau visiteur
//    @CrossOrigin
    @PostMapping("/add")
    public ResponseEntity<Visitor> addVisitor(@RequestBody Visitor visitor){
        Visitor newVisitor = visitorService.addVisitor(visitor);
        return new ResponseEntity<>(newVisitor, HttpStatus.CREATED);
    }

    //mettre à jour les information d'un utilisateur existent avec l'objet
    @CrossOrigin
    @PutMapping("/update")
    public ResponseEntity<Visitor> updateVisitor(@RequestBody Visitor visitor){
        Visitor updateVisitor = visitorService.updateVisitor(visitor);
        return new ResponseEntity<>(updateVisitor, HttpStatus.OK);
    }

    //mettre à jour les information d'un utilisateur existent avec l'ID
//    @CrossOrigin
//    @PutMapping("/update/{visitorId}")
//    public ResponseEntity<Visitor> updateVisitor(@PathVariable Long visitorId, @RequestBody Visitor updatedVisitorData) {
//        // Mettez à jour le visiteur en utilisant l'ID spécifié
//        Visitor updatedVisitor = visitorService.updateVisitor(visitorId, updatedVisitorData);
//
//        return new ResponseEntity<>(updatedVisitor, HttpStatus.OK);
//    }

    //supprimer un visiteur à partir de son identifiant
//    @CrossOrigin
    @DeleteMapping("/delete/{visitorId}")
    public ResponseEntity<?> deleteVisiteurByVisitorId(@PathVariable("visitorId") Long visitorId){
        visitorService.deleteVisitorByVisitorId(visitorId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
