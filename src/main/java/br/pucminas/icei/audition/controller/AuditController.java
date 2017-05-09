package br.pucminas.icei.audition.controller;

import br.pucminas.icei.audition.repository.AuditEventRepository;
import info.atende.audition.model.AuditEvent;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.util.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;

/**
 * @author Claudinei Gomes Mendes
 */
@RestController
@RequestMapping("/rest/auditevent")
public class AuditController {
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
    public ResponseEntity<List<AuditEvent>> search(@RequestBody Map<String, Object> filtro){

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

    @RequestMapping(value = "/planilha", method = RequestMethod.POST)
    public void getFile( @RequestBody Map<String, Object> filtro,
                         HttpServletResponse response ) {
        String token = filtro.get("token").toString();
        String fileName = token + ".xls";

        /*if(filtro.get("date").toString().equals("null")){
            searchWithDate()
        }*/

        try {
            // get your file as InputStream
            File initialFile = new File(fileName);
            InputStream is = new FileInputStream(initialFile);
            // copy it to response's OutputStream
            response.setContentType("application/xls");
            response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
            IOUtils.copy(is, response.getOutputStream());

            response.flushBuffer();
        } catch (IOException ex) {
            ex.printStackTrace();
            throw new RuntimeException("IOError writing file to output stream");
        }

    }


    public void toExcel(List<AuditEvent> list, String fileName){
        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet firstSheet = workbook.createSheet("Resultados do Filtro - AuditView");

        FileOutputStream fos = null;

        try {
            fos = new FileOutputStream(new File(fileName));

            // Este trecho obtem uma lista de objetos do tipo CD
            // do banco de dados através de um DAO e itera sobre a lista
            // criando linhas e colunas em um arquivo Excel com o conteúdo
            // dos objetos.

            int i = 1;

            HSSFRow row = firstSheet.createRow(0);
            row.createCell(0).setCellValue("Id");
            row.createCell(1).setCellValue("Application Name");
            row.createCell(2).setCellValue("User Name");
            row.createCell(3).setCellValue("Action");
            row.createCell(4).setCellValue("Resource Type");
            row.createCell(5).setCellValue("Resource Id");
            row.createCell(6).setCellValue("Date");
            row.createCell(7).setCellValue("Ip");
            row.createCell(8).setCellValue("Security Level");

            for (AuditEvent cd : list) {
                row = firstSheet.createRow(i);

                row.createCell(0).setCellValue(cd.getId());
                row.createCell(1).setCellValue(cd.getApplicationName());
                row.createCell(2).setCellValue(cd.getUserName());
                row.createCell(3).setCellValue(cd.getAction());
                row.createCell(4).setCellValue(cd.getResource().getResourceType());
                row.createCell(5).setCellValue(cd.getResource().getResourceId());
                row.createCell(6).setCellValue(cd.getDateTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
                row.createCell(7).setCellValue(cd.getIp());
                row.createCell(8).setCellValue(cd.getSecurityLevel().toString());

                i++;

            } // fim do for

            workbook.write(fos);

        } catch (Exception e) {
            System.out.println("Erro ao exportar arquivo");
            e.printStackTrace();
        } finally {
            try {
                fos.flush();
                fos.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
