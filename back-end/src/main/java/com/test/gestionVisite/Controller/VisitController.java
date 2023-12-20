package com.test.gestionVisite.Controller;

import com.test.gestionVisite.Entity.Visit;
import com.test.gestionVisite.Entity.Visitor;
import com.test.gestionVisite.Service.VisitService;
import com.test.gestionVisite.Service.VisitorService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/visit")
public class VisitController {

    private final VisitService visitService;

    @GetMapping("/all")
    public ResponseEntity<List<Visit>> getAllVisitors(){
        List<Visit> visits = visitService.findAllVisits();
        return new ResponseEntity<>(visits, HttpStatus.OK);
    }

    @GetMapping("/find/{visitCode}")
    public ResponseEntity<Visit> getVisitByVisitCode(@PathVariable("visitCode") Long visitCode){
        Visit visit = visitService.findByVisitCode(visitCode);
        return new ResponseEntity<>(visit, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Visit> addVisit(@RequestBody Visit visit){
        Visit newVisit = visitService.addVisit(visit);
        return new ResponseEntity<>(newVisit, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Visit> updateVisit(@RequestBody Visit visit){
        Visit updateVisit = visitService.updateVisit(visit);
        return new ResponseEntity<>(updateVisit, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{visitCode}")
    public ResponseEntity<?> deleteVisitByVisitCode(@PathVariable("visitCode") Long visitCode){
        visitService.deleteVisitByVisitCode(visitCode);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
