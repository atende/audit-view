package br.pucminas.icei.audition.controller;

import br.pucminas.icei.audition.entity.AuditEvent;
import br.pucminas.icei.audition.repository.AuditEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * @author Claudinei Gomes Mendes
 */
@RestController
public class AuditController {
    @Autowired
    AuditEventRepository auditEventRepository;

//    @RequestMapping
    public ResponseEntity<List<AuditEvent>> procurar(Map<String, String> filtro){
        List<AuditEvent> result = auditEventRepository.search(filtro);

        return ResponseEntity.ok(result);

    }
}
