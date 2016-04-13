package br.pucminas.icei.audition.controller;

import br.pucminas.icei.audition.entity.AuditEvent;
import br.pucminas.icei.audition.repository.AuditEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Iterator;
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
    public ResponseEntity<List<AuditEvent>> procurar(@RequestBody Map<String, Object> filtro){

        Map<String, Object> novoFiltro = filterBlankParameter(filtro);
        List<AuditEvent> result = auditEventRepository.search(novoFiltro);

        return ResponseEntity.ok(result);

    }
    
    @RequestMapping(value = "/applications", method = RequestMethod.GET)
    public List<String> listarApplications(){
        return auditEventRepository.listApplicationNames();
    }

    private Map<String, Object> filterBlankParameter(Map<String, Object> filtro){
        Map<String, Object> resp = filtro;


        Iterator it = resp.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry pair = (Map.Entry)it.next();
            Object value = pair.getValue();

            if(value == null || isAEmptyString(value)) {
                it.remove();
                resp.remove(pair.getKey(), value);
            }
        }

        return resp;
    }

    private boolean isAEmptyString(Object o){
        if(o instanceof String){
            String s = (String)o;
            return s.trim().equals("");
        }
        return false;
    }
}
