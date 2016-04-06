package br.pucminas.icei.audition.repository;

/**
 * @author Claudinei Gomes Mendes
 */

import java.util.List;

import br.pucminas.icei.audition.entity.AuditEvent;
import br.pucminas.icei.audition.entity.SecurityLevel;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(collectionResourceRel = "auditevent", path = "auditevent")
public interface AuditEventRepository extends PagingAndSortingRepository<AuditEvent, Long> {

    List<AuditEvent> findByAction(@Param("action") String action);

    List<AuditEvent> findBySecurityLevel(@Param("securityLevel") SecurityLevel securityLevel);

    List<AuditEvent> findByApplicationName(@Param("appName") String appName);

    List<AuditEvent> findByUserName(@Param("userName") String userName);

    List<AuditEvent> findByIp(@Param("ip") String ip);


}