import { Component } from '@angular/core';

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
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

}
