package br.pucminas.icei.audition.controller;

import br.pucminas.icei.audition.repository.AuditEventRepository;
import info.atende.audition.model.AuditEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
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

    @RequestMapping(value="/search", method = RequestMethod.POST, consumes = { "application/json" } )
    public ResponseEntity<List<AuditEvent>> searchWithoutDate(@RequestBody Map<String, Object> filtro){

        Map<String, Object> novoFiltro = filterBlankParameter(filtro);
        novoFiltro = deleteFilterDate(novoFiltro);
        List<AuditEvent> result = auditEventRepository.searchWithoutDate(novoFiltro);

        return ResponseEntity.ok(result);
    }

    @RequestMapping(value="/create", method = RequestMethod.POST)
    public ResponseEntity createEvent(@RequestBody AuditEvent auditevent){
        auditEventRepository.create(auditevent);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


    @RequestMapping(value = "/applications", method = RequestMethod.GET)
    public List<String> listarApplications(){
        return auditEventRepository.listApplicationNames();
    }

    @RequestMapping(value = "/resourcetypes", method = RequestMethod.GET)
    public List<String> listResourceTypes(){
        return auditEventRepository.listResourceTypes();
    }

    @RequestMapping(value = "/search/dates/{dateStart}/{dateEnd}", method = RequestMethod.POST)
    public ResponseEntity<List<AuditEvent>> searchWithDate(@RequestBody Map<String, Object> filtro,
                                                          @PathVariable("dateStart") Date dateStart, @PathVariable("dateEnd") Date dateEnd){


        LocalDateTime dStart = LocalDateTime.ofInstant(dateStart.toInstant(), ZoneId.systemDefault());
        LocalDateTime dEnd = LocalDateTime.ofInstant(dateEnd.toInstant(), ZoneId.systemDefault());

        filtro = filterBlankParameter(filtro);

        List<AuditEvent> result = auditEventRepository.searchIncludeDate(filtro, dStart, dEnd);
        return ResponseEntity.ok(result);
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

    private Map<String, Object> deleteFilterDate(Map<String, Object> filtro){
        Map<String, Object> resp = filtro;

        Iterator it = resp.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry pair = (Map.Entry)it.next();
            Object value = pair.getValue();

            if(pair.getKey() == "dateStart" || pair.getKey() == "dateEnd"  || pair.getKey() == "timeStart" || pair.getKey() == "timeEnd") {
                it.remove();
                resp.remove(pair.getKey(), value);
                System.out.println(pair.getKey() + " ---> " + pair.getValue());
            }
        }

        return resp;
    }
}
