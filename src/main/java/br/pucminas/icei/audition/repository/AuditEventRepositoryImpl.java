package br.pucminas.icei.audition.repository;

import br.pucminas.icei.audition.entity.AuditEvent;

import java.util.List;

/**
 * @author Claudinei Gomes Mendes
 */
public abstract class AuditEventRepositoryImpl implements AuditEventRepository {

    public List<AuditEvent> findPersonalized(String ip, String appName){
        AuditEventRepository a = null;

        List<AuditEvent> listIp = a.findByIp(ip);
        List<AuditEvent> listAppName = a.findByIp(appName);

        listIp.retainAll(listAppName);
        return listIp;

    }
}
