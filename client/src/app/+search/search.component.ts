import {Component, OnInit} from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';

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

  search(down){
    let url = 'rest/auditevent/search';

    if(this.dateStart != undefined && this.dateEnd != undefined){
      this.filtro.dateStart = this.dateStart;
      this.filtro.dateEnd = this.dateEnd;
    }else{
      this.filtro.dateStart = "null";
      this.filtro.dateEnd = "null";
    }
    if(down == false){
      this.http.post(url, this.filtro).subscribe(r => {
        let data = r.json();
        this.eventos = data;
      });
    }else{
      this.http.post(url, this.filtro).subscribe(r => {
        let data = r.json();
        this.eventos = data;
        this.filtro.token = generateId(6);
        this.download();
      });
    }
  }

  download() {
    this.filtro.token = generateId(6);

    let url = 'rest/auditevent/planilha';

    this.http.post(url, this.filtro).subscribe(r => {

      var contentType = {type: "application/csv"}
      var blob = new Blob([r.arrayBuffer()], contentType);

      console.log(r)
      console.log(blob)

      saveAs(blob, 'planilha.csv');
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
