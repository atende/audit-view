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

      var filtro = '{ "filtro" : [' +
        '{ "pesquisar":' + $scope.pesquisa + ' },' +
        '{ "citicidade":' + $scope.criticidadeSelecionada + ' },' +
        '{ "aplicacao":' + $scope.aplicacaoSelecionada + ' }, ' +
        '{ "radioButton":' + $scope.radio_filtro + ' }' +
        ' ]}';

      console.log(filtro);
      console.log("teste");

      $http.post('http://127.0.0.1:8080/api/auditevent/findPersonalized', filtro)
        .success(function (data, status, headers, config) {
          $scope.PostDataResponse = data;
        })
        .error(function (data, status, header, config) {
          $scope.ResponseDetails = "Data: " + data +
            "<hr />status: " + status +
            "<hr />headers: " + header +
            "<hr />config: " + config;
        });

      $http.get('http://127.0.0.1:8080/api/auditevent')
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


    }

  });

/*



 $scope.pesquisar = function(log) {
 if ($scope.pesquisa) {

 var resp = false;

 if($scope.radio_filtro == "usuario"){
 resp = log.usuario.toLowerCase().indexOf($scope.pesquisa.toLowerCase()) == 0;
 }

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

 */
