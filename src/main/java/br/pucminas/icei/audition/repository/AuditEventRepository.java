package br.pucminas.icei.audition.repository;

/**
 * @author Claudinei Gomes Mendes
 */

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import br.pucminas.icei.audition.entity.AuditEvent;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import sun.swing.BakedArrayList;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;

@Component
public class AuditEventRepository {
    @PersistenceContext
    private EntityManager em;

    public List<AuditEvent> search(Map<String, String> filtro){
        return buildQuery(filtro).getResultList();
    }

    private TypedQuery<AuditEvent> buildQuery(Map<String, String> filtro) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<AuditEvent> q = cb.createQuery(AuditEvent.class);
        Root<AuditEvent> root = q.from(AuditEvent.class);

        q.select(root);
        ParameterExpression<String> p = cb.parameter(String.class);

        List<Predicate> predicates = new ArrayList();

        Iterator it = filtro.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry pair = (Map.Entry)it.next();
            predicates.add(cb.equal(root.get((String) pair.getKey()), pair.getValue()));
            it.remove(); // avoids a ConcurrentModificationException
        }
        CriteriaQuery<AuditEvent> where = q.where(cb.and(predicates.toArray(new Predicate[predicates.size()])));

        return em.createQuery(where);

    }


}