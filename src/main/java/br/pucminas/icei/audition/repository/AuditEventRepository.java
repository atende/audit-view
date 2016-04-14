package br.pucminas.icei.audition.repository;

/**
 * @author Claudinei Gomes Mendes
 */

import br.pucminas.icei.audition.entity.AuditEvent;
import br.pucminas.icei.audition.entity.SecurityLevel;
import org.hibernate.jpa.boot.scan.spi.ScanOptions;
import org.springframework.stereotype.Component;

import javax.jws.soap.SOAPBinding;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.sql.SQLOutput;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Component
public class AuditEventRepository {
    @PersistenceContext
    private EntityManager em;

    public List<AuditEvent> search(Map<String, Object> filtro){
        String securityLevel = (String) filtro.get("securityLevel");
        if(securityLevel != null){
            filtro.put("securityLevel", SecurityLevel.valueOf(securityLevel));
        }
        return buildQuery(filtro).getResultList();
    }

    public List<String> listApplicationNames(){
        return em.createQuery("SELECT distinct e.applicationName from AuditEvent e").getResultList();
    }


    private TypedQuery<AuditEvent> buildQuery(Map<String, Object> filtro) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<AuditEvent> q = cb.createQuery(AuditEvent.class);
        Root<AuditEvent> root = q.from(AuditEvent.class);

        q.select(root);


        List<Predicate> predicates = new ArrayList();

        Iterator it = filtro.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry pair = (Map.Entry)it.next();
            predicates.add(cb.equal(root.get((String) pair.getKey()), pair.getValue()));
            it.remove(); // avoids a ConcurrentModificationException
        }
        CriteriaQuery<AuditEvent> where = q.where(cb.and(predicates.toArray(new Predicate[predicates.size()])));

        where.orderBy(cb.asc(root.get("dateTime")));
        return em.createQuery(where);

    }


}
