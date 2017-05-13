import {Component, OnInit} from '@angular/core';
import {Http, RequestOptions, Response, Headers} from '@angular/http';

import { saveAs } from 'file-saver';

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
  resourcesTypes = [];
  logSelecionado: any = {
    resource: {},
    dateTime: {}
  };
  eventos = [];
  dateStart;
  dateEnd;

  constructor(private http: Http) {

  }

  ngOnInit() {
    this.loadApplications();
    this.loadResourceTypes();
    this.popular();

    this.filtro.dateStart = "null";
    this.filtro.dateEnd = "null";
  }

  loadApplications() {
    this.http.get('rest/auditevent/applications').subscribe(r => {
      this.aplicacoes = r.json();
    });
  };

  loadResourceTypes() {
    this.http.get('rest/auditevent/resourcetypes').subscribe(r => {
      this.resourcesTypes = r.json();
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

  search(down){
    let url = 'rest/auditevent/search';

    if(this.dateStart != undefined && this.dateEnd != undefined){
      this.filtro.dateStart = this.dateStart;
      this.filtro.dateEnd = this.dateEnd;
    }else{
      this.filtro.dateStart = "null";
      this.filtro.dateEnd = "null";
    }
    let headers = new Headers();
    if(down) {
      headers.append("Accept", "application/csv");
    }
    this.http.post(url, this.filtro, {headers: headers}).subscribe(response => {
      if(response.headers.get("Content-Type") == "application/csv") {
        this.download(response);
      }else {
        this.eventos = response.json();
      }
    });
  }

  download(response: Response) {
      const contentType = {type: "application/csv"};
      const blob = new Blob([response.arrayBuffer()], contentType);
      saveAs(blob, 'planilha.csv');
  };


  popular() {
    if (this.checkDate()) {
      this.http.post('rest/auditevent/search', this.filtro).subscribe(function (response) {
        this.eventos = response.json();
      });
    }
  }
}
