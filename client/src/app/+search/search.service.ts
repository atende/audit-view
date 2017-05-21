import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Headers, Http, Response } from "@angular/http";
import { AuditEvent } from "../shared/models";

export interface SearchResult {
  data?: AuditEvent[]
  total?: number
}

@Injectable()
export class SearchService {

  constructor(private http: Http) {

  }

  getResourceTypes(): Observable<any> {
    return this.http.get('rest/auditevent/resourcetypes').map(r => r.json());
  }

  getApplications(): Observable<any> {
    return this.http.get('rest/auditevent/applications').map(r => r.json());
  }

  doSearch(filter, first: number, max: number, dateStart?: Date, dateEnd?: Date, headers?: Headers): Observable<Response> {

    let url = 'rest/auditevent/search'
    let requestHeaders = headers ? headers : new Headers()
    console.info(requestHeaders)
    requestHeaders.append("first", first.toString())
    requestHeaders.append("max", max.toString())

    if (dateStart != undefined && dateEnd != undefined) {
      requestHeaders.append("dateStart", dateStart.toISOString());
      requestHeaders.append("dateEnd", dateEnd.toISOString())

    }
    return this.http.post(url, filter, {headers: requestHeaders});
  }

  search(filter, first: number, max: number, dateStart?: Date, dateEnd?: Date, headers?: Headers): Observable<SearchResult> {
    return this.doSearch(filter, first, max, dateStart, dateEnd, headers).map(response => {

      let result: SearchResult = {data: [], total: 0}
      if (response.status >= 200 && response.status < 300) {
        let json = response.json();
        let data = json.data
        let total = json.total
        result = {data: data, total: total}
      }
      return result;
    })
  }

  download(filter, first: number, max: number, dateStart?: Date, dateEnd?): Observable<Blob> {
    let requestHeaders = new Headers()
    requestHeaders.append("Accept", "application/csv");
    return this.doSearch(filter, first, max, dateStart, dateEnd, requestHeaders).map(response => {
      const contentType = response.headers.get("Content-Type");
      if (contentType == "application/csv") {
        return new Blob([response.arrayBuffer()], {type: contentType});
      }
    })
  }

}
