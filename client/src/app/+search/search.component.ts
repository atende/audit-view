import {Component, OnInit} from '@angular/core';
import {Http, RequestOptions, ResponseContentType} from '@angular/http';

import { saveAs } from 'file-saver';
import {Observable} from "rxjs/Observable";
import generateId from "../shared/token/token";

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

  search(){
    let url = 'rest/auditevent/search';

    if(this.dateStart != undefined && this.dateEnd != undefined){
      this.filtro.dateStart = this.dateStart;
      this.filtro.dateEnd = this.dateEnd;
    }else{
      this.filtro.dateStart = "null";
      this.filtro.dateEnd = "null";
    }

    this.http.post(url, this.filtro).subscribe(r => {
      let data = r.json();
      this.eventos = data;
    });
  }

  download() {
    let url = 'rest/auditevent/planilha';
    var token = generateId(6);

    this.http.post(url, {token: token}).subscribe(r => {
      //let blob: Blob = r.blob();
      let blob = new Blob([r.arrayBuffer()], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' });

      window['saveAs'](blob, 'planilha.xls');

      saveAs(blob, 'planilha.xls');


      // var contentType = 'application/vnd.ms-excel';
      // var blob = new Blob([r.text()], { type: contentType });
      //
      // saveAs(blob, 'planilha.xls');


      //console.log(r);
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
