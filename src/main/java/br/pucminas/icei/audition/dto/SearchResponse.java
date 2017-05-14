package br.pucminas.icei.audition.dto;

import info.atende.audition.model.AuditEvent;

import java.util.List;

/**
 * @author Giovanni Silva.
 */
public class SearchResponse {
    private long total;
    private List<AuditEvent> data;

    public SearchResponse(long total, List<AuditEvent> data) {
        this.total = total;
        this.data = data;
    }

    public SearchResponse() {
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public List<AuditEvent> getData() {
        return data;
    }

    public void setData(List<AuditEvent> data) {
        this.data = data;
    }
}
