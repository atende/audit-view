import {Component, OnInit} from '@angular/core';
import {Http, RequestOptions, Response, Headers} from '@angular/http';

import { saveAs } from 'file-saver';
import {AppService} from "../app.service";
import {Message} from 'primeng/primeng';

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
  constructor(private http: Http, private appService: AppService) {

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
      const message: Message = {severity: 'warning', summary: 'Erro na data', detail: 'Data inicial tem que ser menor ou igual a data final.'}
      this.appService.showMessage(message);
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
      }else if(response.status >= 200 && response.status < 300) {
        this.eventos = response.json();
      }else { // Error 500
        this.showError(response.text())
      }
    }, error => {
      this.showError(error)
    });
  }
  showError(e) {
    let message: Message = {severity: 'error', summary: 'Ocorreu um erro no servidor', detail: e}
    this.appService.showMessage(message)
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
