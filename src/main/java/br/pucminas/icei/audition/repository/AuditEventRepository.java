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
import java.time.LocalDateTime;
import java.util.*;

@Component
@Repository
public class AuditEventRepository {
    @PersistenceContext
    private EntityManager em;

    @Transactional
    public void create(AuditEvent auditEvent) {
        em.persist(auditEvent);
    }


    public SearchResponse search(Map<String, Object> filtro, Long start, Long max) {
        return search(filtro, start, max, null, null);
    }

    public SearchResponse search(Map<String, Object> filtro, Long start, Long max,
                                 LocalDateTime dStart, LocalDateTime dEnd) {

        String securityLevel = (String) filtro.get("securityLevel");
        if (securityLevel != null) {
            filtro.put("securityLevel", SecurityLevel.valueOf(securityLevel));
        }
        return buildQuery(filtro, start, max, dStart, dEnd);

    }

    public List<String> listApplicationNames() {
        return em.createQuery("SELECT distinct e.applicationName from AuditEvent e").getResultList();
    }

    private SearchResponse buildQuery(Map<String, Object> filtro,
                                      Long start,
                                      Long max,
                                      LocalDateTime dateStart,
                                      LocalDateTime dateEnd) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<AuditEvent> q = cb.createQuery(AuditEvent.class);
        Root<AuditEvent> root = q.from(AuditEvent.class);


        List<Predicate> predicates = new ArrayList();

        Iterator it = filtro.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry pair = (Map.Entry) it.next();
            String key = (String) pair.getKey();
            if (key == "action") {
                predicates.add(cb.like(root.get(key), pair.getValue() + "%"));
            } else {
                predicates.add(cb.equal(root.get(key), pair.getValue()));
            }
            it.remove(); // avoids a ConcurrentModificationException
        }

        // Dates
        if (dateStart != null && dateEnd != null) {
            predicates.add(cb.between(root.get("dateTime"), dateStart, dateEnd));
        }


        CriteriaQuery<AuditEvent> where = q.where(cb.and(predicates.toArray(new Predicate[predicates.size()])));

        Long countResult = JpaUtils.count(em, where);
        q.select(root);
        where.orderBy(cb.asc(root.get("dateTime")));

        TypedQuery<AuditEvent> query = em.createQuery(where);

        // Pagination
        if (start != null && max != null) {
            query.setFirstResult(start.intValue())
                    .setMaxResults(max.intValue());
        }

        List<AuditEvent> result = query.getResultList();
        return new SearchResponse(countResult, result);

    }


}
