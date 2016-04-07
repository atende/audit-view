package br.pucminas.icei.audition.audition.entity;

import br.pucminas.icei.audition.StringUtil;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Transient;
import java.util.Arrays;
import java.util.List;

/**
 * Represents a resource in the AuditEvent.
 * A resource has a resourceType and resourceId. Ex: student 1234
 * @author Giovanni Silva
 */
@Embeddable
public class Resource {
    public static final String RESOURCE_ID_NOT_APPLICABLE = "NOT_APPLICABLE";
    @Column(nullable = false, length = 200)
    private String resourceType;
    @Column(nullable = false, length = 200)
    private String resourceId;

    public Resource(String resourceType, String... resourceIds){
        this.resourceType = resourceType;
         setResourceIds(resourceIds);
    }
    public Resource(String resourceType){
        this.resourceType = resourceType;
        setResourceId(RESOURCE_ID_NOT_APPLICABLE);
    }

    public Resource() {
    }

    public String getResourceType() {
        return resourceType;
    }

    public void setResourceType(String resourceType) {
        this.resourceType = resourceType;
    }

    public String getResourceId() {
        return resourceId;
    }

    public void setResourceId(String resourceId) {
        this.resourceId = resourceId;
    }

    /**
     * Set resourceIds like comman separated value
     * @param resourceIds IDs to be setted
     */
    @Transient
    public void setResourceIds(String... resourceIds){
        this.resourceId = StringUtil.toCsv(Arrays.asList(resourceIds));
    }

    /**
     * Return resourceIds as a list. ResourceId could be in common separeted value
     * @return List
     */
    @Transient
    public List<String> getResourceIds(){
        return StringUtil.fromCsv(this.resourceId);
    }

    @Override
    public String toString() {
        return "Resource{" +
                "resourceType='" + resourceType + '\'' +
                ", resourceId='" + resourceId + '\'' +
                '}';
    }
}
