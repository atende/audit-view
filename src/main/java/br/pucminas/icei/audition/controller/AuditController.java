package br.pucminas.icei.audition.controller;

import br.pucminas.icei.audition.business.export.Worksheet;
import br.pucminas.icei.audition.repository.AuditEventRepository;
import info.atende.audition.model.AuditEvent;
import org.apache.poi.util.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

/**
 * @author Claudinei Gomes Mendes
 */
@RestController
@RequestMapping("/rest/auditevent")
public class AuditController {

    private Logger logger = LoggerFactory.getLogger(AuditController.class);

    @Autowired
    AuditEventRepository auditEventRepository;

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

    @RequestMapping(value = "/search", method = RequestMethod.POST)
    public ResponseEntity search(@RequestBody Map<String, Object> filtro,
                                                   @RequestHeader("Accept") String accept,
                                                   HttpServletResponse response){
        List<AuditEvent> result = null;

        if( !filtro.get("dateStart").toString().equals("null") &&
            !filtro.get("dateEnd").toString().equals("null")){

            Date dateStart = null;
            Date dateEnd = null;
            try {
                dateStart = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.ENGLISH)
                        .parse(filtro.get("dateStart").toString());
                dateEnd = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.ENGLISH)
                        .parse(filtro.get("dateEnd").toString());
            } catch (ParseException e) {
                e.printStackTrace();
            }
            if(dateStart != null && dateEnd != null){
                LocalDateTime dStart = LocalDateTime.ofInstant(dateStart.toInstant(), ZoneId.systemDefault());
                LocalDateTime dEnd = LocalDateTime.ofInstant(dateEnd.toInstant(), ZoneId.systemDefault());
                filtro = filterBlankParameter(filtro);

                filtro.remove("dateStart");
                filtro.remove("dateEnd");

                result = auditEventRepository.searchIncludeDate(filtro, dStart, dEnd);
            }
        }else{
            Map<String, Object> novoFiltro = filterBlankParameter(filtro);
            novoFiltro = deleteFilterDate(novoFiltro);
            filtro.remove("dateStart");
            filtro.remove("dateEnd");
            result = auditEventRepository.searchWithoutDate(novoFiltro);
        }
        if(accept != null && accept.equalsIgnoreCase("application/csv")){
            Worksheet worksheet = new Worksheet();
            try {
                InputStream fileStream = worksheet.writeToCSV(result);
                // get your file as InputStream
                // copy it to response's OutputStream
                response.setContentType("application/csv");

                IOUtils.copy(fileStream, response.getOutputStream());

                response.flushBuffer();
            } catch (IOException ex) {
                logger.error(ex.getMessage());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
            }
            // Close response and return OK
            return ResponseEntity.ok().build();
        }

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
            }
        }

        return resp;
    }
}
