import {Component, OnInit} from "@angular/core";
import {saveAs} from "file-saver";
import {AppService} from "../app.service";
import {Message} from "primeng/primeng";
import {SearchService} from "./search.service";
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
  resourcesTypes: any = []
  totalRecords = 0
  rows = 100
  constructor(private service: SearchService, private appService: AppService) {

  }

  ngOnInit() {
    this.loadApplications();
    this.loadResourceTypes();
    this.popular();
    this.filtro.dateStart = "null";
    this.filtro.dateEnd = "null";
  }

  loadApplications() {
    this.service.getApplications().subscribe(r => {
      this.aplicacoes = r;
    });
  };

  loadResourceTypes() {
    this.service.getResourceTypes().subscribe(r => {
      this.resourcesTypes = r;
    })
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

  search() {
    this.service.search(this.filtro, 1, this.rows).subscribe(response => {
      this.totalRecords = response.total
      this.eventos = response.data
    })
  }

  download() {
    // Max java int
    const max = 2147483647
    this.service.download(this.filtro, 1, max, this.dateStart, this.dateEnd)
      .subscribe(blob => saveAs(blob, 'planilha.csv'))
  }

  popular() {
    this.onLazyLoad({first: 0, rows: this.rows})
  }

  onLazyLoad(event) {
    this.service.search(this.filtro, event.first, event.first + event.rows, this.dateStart, this.dateEnd).subscribe(response => {
      this.totalRecords = response.total
      this.eventos = response.data
    })
  }
}
