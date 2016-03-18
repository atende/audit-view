'use strict';

/**
 * @ngdoc function
 * @name auditionApp.controller:VisualizarCtrl
 * @description
 * # VisualizarCtrl
 * Controller of the auditionApp
 */

var app = angular.module('auditionApp');

app.controller('VisualizarCtrl', function ($scope) {

    $scope.filtros = [];

    $scope.criticidades = ["Alta", "Normal", "Baixa"];
    $scope.aplicacoes = ["SGI", "Mapa PUC", "SGL", "AUDIT"];

    $scope.logSelecionado = null;
    $scope.indexSelecionado = null;

    $scope.filtrosDeAplicacao = [];

    $scope.clickTable = function(log, index) {
      $scope.logSelecionado = log;
      $scope.indexSelecionado = index;
    };


    $scope.pesquisar = function(log) {
      if ($scope.pesquisa) {

        var resp = false;

        if($scope.radio_filtro == "usuario"){
          resp = log.usuario.toLowerCase().indexOf($scope.pesquisa.toLowerCase()) == 0;
        }

        //if($scope.radio_filtro == "usuario"){
        //
        //
        //  return log.usuario.toLowerCase().indexOf($scope.pesquisa.toLowerCase()) == 0 &&
        //         log.aplicacao.indexOf($scope.aplicacaoSelecionada) == 0 &&
        //         log.criticidade.indexOf($scope.criticidadeSelecionada) == 0;
        //
        //}
        else if($scope.radio_filtro == "acao"){
          resp = log.acao.toLowerCase().indexOf($scope.pesquisa.toLowerCase()) == 0;
        }
        else if($scope.radio_filtro == "id"){
          resp = log.id.toLowerCase().indexOf($scope.pesquisa.toLowerCase()) == 0;
        }
        else if($scope.radio_filtro == "datas"){
          resp = log.datas.toLowerCase().indexOf($scope.pesquisa.toLowerCase()) == 0;
        }
        else if($scope.radio_filtro == "ip"){
          resp = log.ip.toLowerCase().indexOf($scope.pesquisa.toLowerCase()) == 0;
        }

        if($scope.criticidadeSelecionada != undefined){
          console.log(resp);
          resp = resp && log.criticidade.indexOf($scope.criticidadeSelecionada) == 0;
        }
        if($scope.aplicacaoSelecionada != undefined){
          console.log(resp);
          resp = resp && log.aplicacao.indexOf($scope.aplicacaoSelecionada) == 0;
        }

        return resp;


      }else if($scope.aplicacaoSelecionada != undefined && $scope.criticidadeSelecionada == undefined){
        return log.aplicacao.toLowerCase().indexOf($scope.aplicacaoSelecionada.toLowerCase()) == 0;
      }
      else if($scope.criticidadeSelecionada != undefined && $scope.aplicacaoSelecionada == undefined){
        return log.criticidade.toLowerCase().indexOf($scope.criticidadeSelecionada.toLowerCase()) == 0;
      }
      else if($scope.criticidadeSelecionada != undefined && $scope.aplicacaoSelecionada != undefined){
        return log.aplicacao.toLowerCase().indexOf($scope.aplicacaoSelecionada.toLowerCase()) == 0 &&
               log.criticidade.toLowerCase().indexOf($scope.criticidadeSelecionada.toLowerCase()) == 0;
      }

      return true;
    };

    $scope.logs = [
      {
        aplicacao: "Mapa PUC",
        usuario: "Anderson",
        acao: "teste1",
        id: "12341",
        datas: "10/03/2016 : 10:53",
        ip: "192.168.254.254",
        criticidade: "Alta",
        descricao: "bhsadgjkdsa"
      },
      {
        aplicacao: "SGI",
        usuario: "Giovanni",
        acao: "teste2",
        id: "12342",
        datas: "11/03/2016 : 10:53",
        ip: "192.168.254.254",
        criticidade: "Alta",
        descricao: ""
      },
      {
        aplicacao: "AUDIT",
        usuario: "Paulo",
        acao: "teste3",
        id: "12343",
        datas: "12/03/2016 : 10:53",
        ip: "192.168.254.254",
        criticidade: "Alta",
        descricao: ""
      },
      {
        aplicacao: "SGL",
        usuario: "Bruno",
        acao: "teste4",
        id: "12344",
        datas: "13/03/2016 : 10:53",
        ip: "192.168.254.254",
        criticidade: "Alta",
        descricao: ""
      }
    ]

  });


//if($scope.filtroPopular === "todos"){
//  return log.aplicacao.toLowerCase().indexOf($scope.pesquisa.toLowerCase()) == 0 ||
//  log.usuario.toLowerCase().indexOf($scope.pesquisa.toLowerCase()) == 0 ||
//  log.acao.toLowerCase().indexOf($scope.pesquisa.toLowerCase()) == 0 ||
//  log.id.toLowerCase().indexOf($scope.pesquisa.toLowerCase()) == 0 ||
//  log.datas.toLowerCase().indexOf($scope.pesquisa.toLowerCase()) == 0 ||
//  log.ip.toLowerCase().indexOf($scope.pesquisa.toLowerCase()) == 0 ||
//  log.criticidade.toLowerCase().indexOf($scope.pesquisa.toLowerCase()) == 0
//
//}else{
//  return log.aplicacao.toLowerCase().indexOf($scope.pesquisa.toLowerCase()) == 0 && $scope.filtroPopular === "aplicacao" ||
//    log.usuario.toLowerCase().indexOf($scope.pesquisa.toLowerCase()) == 0 && $scope.filtroPopular === "usuario" ||
//    log.acao.toLowerCase().indexOf($scope.pesquisa.toLowerCase()) == 0 && $scope.filtroPopular === "acao" ||
//    log.id.toLowerCase().indexOf($scope.pesquisa.toLowerCase()) == 0 && $scope.filtroPopular === "id" ||
//    log.datas.toLowerCase().indexOf($scope.pesquisa.toLowerCase()) == 0 && $scope.filtroPopular === "datas" ||
//    log.ip.toLowerCase().indexOf($scope.pesquisa.toLowerCase()) == 0 && $scope.filtroPopular === "ip" ||
//    log.criticidade.toLowerCase().indexOf($scope.pesquisa.toLowerCase()) == 0 && $scope.filtroPopular === "criticidade"
//}

/*
 $scope.incluirFiltro = function(filtro) {
 var i = $.inArray(filtro, $scope.filtros);
 if (i > -1) {
 $scope.filtros.splice(i, 1);
 } else {
 $scope.filtros.push(filtro);
 console.log($scope.filtros);
 }
 };

 $scope.logFiltro = function(log) {

 console.log("Filtros: ");
 console.log($scope.filtros);

 if ($scope.filtros.length > 0) {

 if($scope.cb_aplicacao){

 if ($.inArray("aplicacao", $scope.filtros) >= 0 ){
 return log.aplicacao.toLowerCase().indexOf($scope.pesquisa.toLowerCase()) == 0;
 }
 }
 }
 return false;
 };

 */
