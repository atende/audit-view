import {Component, OnInit} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import { saveAs } from 'file-saver';
import {AppService} from "../app.service";
import {Dialog, Message} from 'primeng/primeng';
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
  eventos = [];
  dateStart;
  dateEnd;
  filtrados: any = [];
  resourcesTypes: any = []
  totalRecords = 0
  rows = 100
  down = false
  selectedEvent
  display: boolean = false;

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

  showError(e) {
    let message: Message = {severity: 'error', summary: 'Ocorreu um erro no servidor', detail: e}
    this.appService.showMessage(message)
  }
  download(response: Response) {
    const contentType = {type: "application/csv"};
    const blob = new Blob([response.arrayBuffer()], contentType);
    saveAs(blob, 'planilha.csv');
  };

  search(download) {
    this.down = download;
    // Max java int
    let rows = download ? 2147483647 : this.rows
    this.onLazyLoad({first: 0, rows: rows})
  }
  popular() {
    this.down = false;
    this.onLazyLoad({first: 0, rows: this.rows})
  }
  onLazyLoad(event) {
    let url = 'rest/auditevent/search'
    let requestHeaders = new Headers()
    requestHeaders.append("first", event.first)
    requestHeaders.append("max", event.first + event.rows)
    if (this.down) {
      requestHeaders.append("Accept", "application/csv");
      this.down = false;
    }
    if (this.dateStart != undefined && this.dateEnd != undefined) {
      requestHeaders.append("dateStart", this.dateStart);
      requestHeaders.append("dateEnd", this.dateEnd)

    }
    this.http.post(url, this.filtro, {headers: requestHeaders}).subscribe(response => {

      if (response.headers.get("Content-Type") == "application/csv") {
        this.download(response);
      } else if (response.status >= 200 && response.status < 300) {
        let json = response.json();
        let data = json.data
        let total = json.total
        this.eventos = data;
        this.totalRecords = total
      } else { // Error 500
        this.showError(response.text())
      }
    });
  }
  showDialog() {
    this.display = true;
  }
}
