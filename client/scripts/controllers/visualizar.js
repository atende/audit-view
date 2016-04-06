'use strict';

/**
 * @ngdoc function
 * @name auditionApp.controller:VisualizarCtrl
 * @description
 * # VisualizarCtrl
 * Controller of the auditionApp
 */

var app = angular.module('auditionApp');

app.controller('VisualizarCtrl', function ($scope, $http) {

    $scope.filtros = [];

    $scope.criticidades = ["Alta", "Normal", "Baixa"];
    $scope.aplicacoes = ["SGI", "Mapa PUC", "SGL", "AUDIT"];

    $scope.logSelecionado = null;
    $scope.indexSelecionado = null;

    $scope.filtrosDeAplicacao = [];

    $scope.clickTable = function(log) {
      $scope.logSelecionado = log;
    };

    $scope.eventos = [];



    $scope.popular = function () {

      $http.get('http://127.0.0.1:8080/api/auditevent/search/findByAction?action=create')
        .success(function (data, status, headers, config) {
          $scope.ResponseDetails = "Data: " + data;

          for (var i = 0; i < data._embedded.auditevent.length; i++) {
             $scope.eventos[i] = data._embedded.auditevent[i];
          }

        })
        .error(function (data, status, header, config) {
          $scope.ResponseDetails = "Data: " + data +
            "<br />status: " + status +
            "<br />headers: " + jsonFilter(header) +
            "<br />config: " + jsonFilter(config);
        });
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
