package br.pucminas.icei.audition.repository;

/**
 * @author Claudinei Gomes Mendes
 */

import br.pucminas.icei.audition.entity.AuditEvent;
import br.pucminas.icei.audition.entity.SecurityLevel;
import org.hibernate.jpa.boot.scan.spi.ScanOptions;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Component;

import javax.jws.soap.SOAPBinding;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import javax.persistence.metamodel.EntityType;
import javax.persistence.metamodel.Metamodel;
import java.sql.SQLOutput;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Component
public class AuditEventRepository {
    @PersistenceContext
    private EntityManager em;

    public List<AuditEvent> searchIncludeDate(Map<String, Object> filtro, Object dateStart, Object dateEnd){
        List<AuditEvent> list1 = searchWithoutDate(filtro);
        List<AuditEvent> list2 = searchDate(dateStart, dateEnd);

        return intersection(list1, list2);

    }

    public List<AuditEvent> searchWithoutDate(Map<String, Object> filtro){
        String securityLevel = (String) filtro.get("securityLevel");
        if(securityLevel != null){
            filtro.put("securityLevel", SecurityLevel.valueOf(securityLevel));
        }
        return buildQuery(filtro).getResultList();
    }

    public List<String> listApplicationNames(){
        return em.createQuery("SELECT distinct e.applicationName from AuditEvent e").getResultList();
    }

    public List<AuditEvent> searchDate(Object dateStart, Object dateEnd){
        return em.createQuery("SELECT distinct e from AuditEvent e WHERE e.dateTime BETWEEN :dateStart AND:dateEnd ")
                .setParameter("dateStart", dateStart)
                .setParameter("dateEnd", dateEnd).getResultList();
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



    public <T> List<T> intersection(List<T> list1, List<T> list2) {
        List<T> list = new ArrayList<T>();

        for (T t : list1) {
            if(list2.contains(t)) {
                list.add(t);
            }
        }

        return list;
    }



//    public TypedQuery<AuditEvent> searchByDate(Map<String, Object> filtro ){
//
//        CriteriaBuilder builder = em.getCriteriaBuilder();
//        CriteriaQuery<AuditEvent> cq = builder.createQuery(AuditEvent.class);
//        Metamodel m = em.getMetamodel();
//        EntityType<AuditEvent> AuditEvent_ = m.entity(AuditEvent.class);
//        Root<AuditEvent> auditevent = cq.from(AuditEvent.class);
//
//        return cq.where(builder.between(auditevent.get("dateTime"), filtro.get("dateStart"), filtro.get("dateEnd")), filtro.get("dateStart"), filtro.get("dateEnd"));
//
//    }

}
