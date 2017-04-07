package br.pucminas.icei.audition.repository;

/**
 * @author Claudinei Gomes Mendes
 */

import br.pucminas.icei.audition.dto.SearchResponse;
import info.atende.audition.model.AuditEvent;
import info.atende.audition.model.SecurityLevel;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.*;

@Component
@Repository
public class AuditEventRepository {
    @PersistenceContext
    private EntityManager em;

    public List<AuditEvent> searchIncludeDate(Map<String, Object> filtro, Object dateStart, Object dateEnd){
        List<AuditEvent> list1 = searchWithoutDate(filtro).getData();
        List<AuditEvent> list2 = searchDate(dateStart, dateEnd);

        return intersection(list1, list2);
    }

    @Transactional
    public void create(AuditEvent auditEvent){
        em.persist(auditEvent);
    }


    public SearchResponse searchWithoutDate(Map<String, Object> filtro){
        String securityLevel = (String) filtro.get("securityLevel");
        if(securityLevel != null){
            filtro.put("securityLevel", SecurityLevel.valueOf(securityLevel));
        }
        return buildQuery(filtro);
    }

    public List<String> listApplicationNames(){
        return em.createQuery("SELECT distinct e.applicationName from AuditEvent e").getResultList();
    }

    public List<AuditEvent> searchDate(Object dateStart, Object dateEnd){
        return em.createQuery("SELECT distinct e from AuditEvent e WHERE e.dateTime BETWEEN :dateStart AND :dateEnd ")
                .setParameter("dateStart", dateStart)
                .setParameter("dateEnd", dateEnd).getResultList();
    }

    private SearchResponse buildQuery(Map<String, Object> filtro) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<AuditEvent> q = cb.createQuery(AuditEvent.class);
        Root<AuditEvent> root = q.from(AuditEvent.class);


        List<Predicate> predicates = new ArrayList();

        Iterator it = filtro.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry pair = (Map.Entry)it.next();
            String key = (String) pair.getKey();
            if(key == "action") {
                predicates.add(cb.like(root.get(key), pair.getValue() + "%"));
            }else {
                predicates.add(cb.equal(root.get(key), pair.getValue()));
            }
            it.remove(); // avoids a ConcurrentModificationException
        }

        // Query for count


        CriteriaQuery<AuditEvent> where = q.where(cb.and(predicates.toArray(new Predicate[predicates.size()])));

        Long countResult = JpaUtils.count(em, where);
        q.select(root);
        where.orderBy(cb.asc(root.get("dateTime")));

        TypedQuery<AuditEvent> query = em.createQuery(where);
        List<AuditEvent> result = query.getResultList();
        return new SearchResponse(countResult, result);

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

}
