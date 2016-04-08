package br.pucminas.icei.audition.controller;

import br.pucminas.icei.audition.entity.AuditEvent;
import br.pucminas.icei.audition.repository.AuditEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * @author Claudinei Gomes Mendes
 */
@RestController
@RequestMapping("/rest/auditevent")
public class AuditController {
    @Autowired
    AuditEventRepository auditEventRepository;

//    @RequestMapping(value="/search/{filtro}", method = RequestMethod.GET, consumes = { "application/json" } )
//    public ResponseEntity<List<AuditEvent>> procurar(@PathVariable Map<String, String> filtro){
//        List<AuditEvent> result = auditEventRepository.search(filtro);
//
//        return ResponseEntity.ok(result);
//
//    }

    @RequestMapping(value="/search", method = RequestMethod.POST, consumes = { "application/json" } )
    public ResponseEntity<List<AuditEvent>> procurar(@RequestBody Map<String, String> filtro){

        List<AuditEvent> result = auditEventRepository.search(filtro);

        return ResponseEntity.ok(result);

    }
}
