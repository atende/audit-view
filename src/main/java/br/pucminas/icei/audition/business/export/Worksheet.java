package br.pucminas.icei.audition.business.export;

import info.atende.audition.model.AuditEvent;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.time.format.DateTimeFormatter;
import java.util.List;

/**
 * Class to manipulate Excel and CSV Format
 *
 * @author Giovanni Silva
 */
public class Worksheet {
    private Logger logger = LoggerFactory.getLogger(Worksheet.class);
    //European countries use ";" as
    //CSV separator because "," is their digit separator
    private final String CSV_SEPARATOR = ",";

    public InputStream writeToCSV(List<AuditEvent> list) {


        ByteArrayOutputStream out = new ByteArrayOutputStream();
        try {
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(out));
            StringBuffer oneLine = new StringBuffer();
            oneLine.append("Id");
            oneLine.append(CSV_SEPARATOR);
            oneLine.append("Application Name");
            oneLine.append(CSV_SEPARATOR);
            oneLine.append("User Name");
            oneLine.append(CSV_SEPARATOR);
            oneLine.append("Action");
            oneLine.append(CSV_SEPARATOR);
            oneLine.append("Resource Type");
            oneLine.append(CSV_SEPARATOR);
            oneLine.append("Resource Id");
            oneLine.append(CSV_SEPARATOR);
            oneLine.append("Date");
            oneLine.append(CSV_SEPARATOR);
            oneLine.append("Ip");
            oneLine.append(CSV_SEPARATOR);
            oneLine.append("Security Level");
            bw.write(oneLine.toString());
            bw.newLine();

            for (AuditEvent cd : list) {
                oneLine = new StringBuffer();

                oneLine.append(cd.getId());
                oneLine.append(CSV_SEPARATOR);
                oneLine.append(cd.getApplicationName());
                oneLine.append(CSV_SEPARATOR);
                oneLine.append(cd.getUserName());
                oneLine.append(CSV_SEPARATOR);
                oneLine.append(cd.getAction());
                oneLine.append(CSV_SEPARATOR);
                oneLine.append(cd.getResource().getResourceType());
                oneLine.append(CSV_SEPARATOR);
                oneLine.append(cd.getResource().getResourceId());
                oneLine.append(CSV_SEPARATOR);
                oneLine.append(cd.getDateTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
                oneLine.append(CSV_SEPARATOR);
                oneLine.append(cd.getIp());
                oneLine.append(CSV_SEPARATOR);
                oneLine.append(cd.getSecurityLevel().toString());
                bw.write(oneLine.toString());
                bw.newLine();
            }
            bw.flush();
            bw.close();
        } catch (IOException e) {
            logger.error(e.getMessage());
        }
        InputStream in = new ByteArrayInputStream(out.toByteArray());
        return in;
    }


    public byte[] toExcel(List<AuditEvent> list) {
        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet firstSheet = workbook.createSheet("Resultados do Filtro - AuditView");

        FileOutputStream fos = null;

        try {
            File file = new File("search" + ".xls");
            fos = new FileOutputStream(file);

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
        return workbook.getBytes();
    }
}
