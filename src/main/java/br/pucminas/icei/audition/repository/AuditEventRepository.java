package br.pucminas.icei.audition.repository;

/**
 * @author Claudinei Gomes Mendes
 */

import info.atende.audition.model.AuditEvent;
import info.atende.audition.model.Resource;
import info.atende.audition.model.SecurityLevel;
import org.springframework.data.rest.core.mapping.ResourceType;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Component
@Repository
public class AuditEventRepository {
    @PersistenceContext
    private EntityManager em;

    public List<AuditEvent> searchIncludeDate(Map<String, Object> filtro, Object dateStart, Object dateEnd){
        List<AuditEvent> list1 = searchWithoutDate(filtro);
        List<AuditEvent> list2 = searchDate(dateStart, dateEnd);

        return intersection(list1, list2);
    }

    @Transactional
    public void create(AuditEvent auditEvent){
        em.persist(auditEvent);
    }


    public List<AuditEvent> searchWithoutDate(Map<String, Object> filtro){
        List<AuditEvent> listByResTyp = null;
        List<AuditEvent> listResp;

        String securityLevel = (String) filtro.get("securityLevel");
        if(securityLevel != null){
            filtro.put("securityLevel", SecurityLevel.valueOf(securityLevel));
        }

        String resourceType = (String) filtro.get("resourceType");
        if(resourceType != null){
            listByResTyp = filterByResourceType(resourceType);
            filtro.remove("resourceType");
        }

        listResp = buildQuery(filtro).getResultList();

        if(listByResTyp != null){
            return intersection(listResp, listByResTyp);
        }else{
            return listResp;
        }
    }

    public List<AuditEvent> filterByResourceType(String resourceType){
        return em.createQuery("SELECT e from AuditEvent e WHERE e.resource.resourceType = :rtp")
                .setParameter("rtp", resourceType)
                .getResultList();
    }

    public List<String> listApplicationNames(){
        return em.createQuery("SELECT distinct e.applicationName from AuditEvent e ORDER BY e.applicationName").getResultList();
    }

    public List<String> listResourceTypes(){
        return em.createQuery("SELECT distinct e.resource.resourceType from AuditEvent e").getResultList();
    }

    public List<AuditEvent> searchDate(Object dateStart, Object dateEnd){
        return em.createQuery("SELECT distinct e from AuditEvent e WHERE e.dateTime BETWEEN :dateStart AND :dateEnd ")
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
            String key = (String) pair.getKey();
            if(key.equals("action")) {
                predicates.add(cb.like(root.get(key), pair.getValue() + "%"));
            }else {
                predicates.add(cb.equal(root.get(key), pair.getValue()));
            }
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

}
