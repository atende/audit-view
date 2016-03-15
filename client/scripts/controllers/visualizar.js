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


    $scope.logSelecionado = null;
    $scope.indexSelecionado = null;

    $scope.filtrosDeAplicacao = [];

    $scope.clickTable = function(log, index) {
      $scope.logSelecionado = log;
      $scope.indexSelecionado = index;
    }



    $scope.pesquisar = function(log) {
      if ($scope.pesquisa) {

        if($scope.cb_aplicacao){
          return log.aplicacao.toLowerCase().indexOf($scope.pesquisa.toLowerCase()) == 0;
        }
        if($scope.cb_usuario){
          return log.usuario.toLowerCase().indexOf($scope.pesquisa.toLowerCase()) == 0;
        }
        if($scope.cb_acao){
          return log.acao.toLowerCase().indexOf($scope.pesquisa.toLowerCase()) == 0;
        }
        if($scope.cb_id){
          return log.id.toLowerCase().indexOf($scope.pesquisa.toLowerCase()) == 0;
        }
        if($scope.cb_datas){
          return log.datas.toLowerCase().indexOf($scope.pesquisa.toLowerCase()) == 0;
        }
        if($scope.cb_ip){
          return log.ip.toLowerCase().indexOf($scope.pesquisa.toLowerCase()) == 0;
        }
        if($scope.cb_criticidade){
          return log.criticidade.toLowerCase().indexOf($scope.pesquisa.toLowerCase()) == 0;
        }
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
        criticidade: "altawa",
        descricao: "bhsadgjkdsa"
      },
      {
        aplicacao: "SGI",
        usuario: "Giovanni",
        acao: "teste2",
        id: "12342",
        datas: "11/03/2016 : 10:53",
        ip: "192.168.254.254",
        criticidade: "altawa",
        descricao: ""
      },
      {
        aplicacao: "AUDIT",
        usuario: "Paulo",
        acao: "teste3",
        id: "12343",
        datas: "12/03/2016 : 10:53",
        ip: "192.168.254.254",
        criticidade: "altawa",
        descricao: ""
      },
      {
        aplicacao: "SGL",
        usuario: "Bruno",
        acao: "teste4",
        id: "12344",
        datas: "13/03/2016 : 10:53",
        ip: "192.168.254.254",
        criticidade: "altawa",
        descricao: ""
      }
    ]

  });
