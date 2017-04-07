import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';

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

  checkDate() {
    let dataInicio = new Date(this.dateStart);
    let dataFim = new Date(this.dateEnd);
    if (dataInicio > dataFim) {
      (<any>$('#myModal2')).modal('show');
      return false;
    }
    return true;
  }

  searchIncludeDate() {
    if (this.checkDate()) {
      let url = 'rest/auditevent/search/dates/' + this.dateStart + '/' + this.dateEnd;
      this.http.post(url, this.filtro).subscribe(r => {
        let response = r.json();
        let data = response.data
        let total = response.total
        this.eventos = data;
        this.totalRecords = total
      });
    }
  }

  searchWithoutDate() {
    let url = 'rest/auditevent/search';
    this.http.post(url, this.filtro).subscribe(r => {
      let response = r.json();
      let data = response.data
      let total = response.total
      this.eventos = data;
      this.totalRecords = total
    });
  };

  popular() {
    if (this.checkDate()) {
      this.http.post('rest/auditevent/search', this.filtro).subscribe(function (r) {
        let response = r.json();
        let data = response.data
        let total = response.total
        this.eventos = data;
        this.totalRecords = total
      });
    }
  }

  onLazyLoad(event) {
    console.info(event)
  }
}
