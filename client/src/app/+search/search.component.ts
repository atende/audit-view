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
  filtro = {};
  criticidades = ['LOW', 'NORMAL', 'HIGHT'];
  aplicacoes = [];
  logSelecionado = {
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
  filtrados = [];

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
        let data = r.json();
        this.eventos = data;
      });
    }
  }

  searchWithoutDate() {
    let url = 'rest/auditevent/search';
    this.http.post(url, this.filtro).subscribe(r => {
      this.eventos = r.json();
    });
  };

  popular() {
    if (this.checkDate()) {
      this.http.post('rest/auditevent/search', this.filtro).subscribe(function (r) {
        this.eventos = r.json();
      });
    }
  }
}
