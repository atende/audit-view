import {Component} from '@angular/core';
import {Http} from "@angular/http";

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  selector: 'sd-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css']
})
export class SearchComponent {
  filtro = {};
  criticidades = ["LOW", "NORMAL", "HIGHT"];
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

  loadApplications() {
    this.http.get('rest/auditevent/applications').toPromise().then(r => {
      this.aplicacoes = r.json();
    })
  };

  clickTable(log) {
    this.logSelecionado = log;
  }

  checkDate() {
    var dataInicio = new Date(this.dateStart);
    var dataFim = new Date(this.dateEnd);
    if (dataInicio > dataFim) {
      (<any>$('#myModal2')).modal('show');
      return false;
    }
    return true;
  }

  searchIncludeDate() {

    if (this.checkDate()) {
      var url = 'rest/auditevent/search/dates/' + this.dateStart + '/' + this.dateEnd;
      this.http.post(url, this.filtro).toPromise().then(function (r) {
          var data = r.json();
          this.eventos = data;
        }
      )
    }
  }

  searchWithoutDate() {

    var url = 'rest/auditevent/search';
    this.http.post(url, this.filtro).toPromise().then(function (r) {
        var data = r.json();
        this.eventos = data;
      }
    )
  };

  popular() {

    if (this.checkDate())
      this.http.post('rest/auditevent/search', this.filtro).toPromise().then(function (r) {
          var data = r.json();
          this.eventos = data;
        }
      );

  }


}
