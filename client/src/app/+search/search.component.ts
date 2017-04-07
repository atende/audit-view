import {Component, OnInit} from '@angular/core';
import {Http, Headers} from '@angular/http';

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css']
})
export class SearchComponent implements OnInit {
  filtro: any = {};
  criticidades = ['LOW', 'NORMAL', 'HIGHT'];
  aplicacoes = [];
  logSelecionado: any = {
    resource: {},
    dateTime: {}
  };
  indexSelecionado = {};
  filtrosDeAplicacao = [];
  eventos = [];
  paginados = [];
  currentPage = 1;
  numPerPage = 11;
  maxSize = 10;
  dateStart;
  dateEnd;
  filtrados: any = [];

  totalRecords = 0
  rows = 100
  constructor(private http: Http) {

  }

  ngOnInit() {
    this.loadApplications();
    this.popular();
  }

  loadApplications() {
    this.http.get('rest/auditevent/applications').subscribe(r => {
      this.aplicacoes = r.json();
    });
  };

  clickTable(log) {
    this.logSelecionado = log;
  }


  popular() {
    this.onLazyLoad({first: 0, rows: this.rows})
  }

  onLazyLoad(event) {
    let requestHeaders = new Headers()
    requestHeaders.append("first", event.first)
    requestHeaders.append("max", event.first + event.rows)
    let url = 'rest/auditevent/search'
    if(this.dateStart != undefined && this.dateEnd != undefined) {
      requestHeaders.append("dateStart", this.dateStart);
      requestHeaders.append("dateEnd", this.dateEnd)

    }
    this.http.post(url, this.filtro, {headers: requestHeaders}).subscribe(r => {
      let response = r.json();
      let data = response.data
      let total = response.total
      this.eventos = data;
      this.totalRecords = total
    });
  }
}
