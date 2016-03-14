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

    $scope.clickTable = function(log, index) {
      $scope.logSelecionado = log;
      $scope.indexSelecionado = index;
    }

    $scope.pesquisar = function(log) {
      if ($scope.pesquisa) {
        return log.aplicacao.indexOf($scope.pesquisa) == 0 && $scope.filtroPopular === "aplicacao" ||
            log.usuario.indexOf($scope.pesquisa) == 0 && $scope.filtroPopular === "usuario" ||
            log.acao.indexOf($scope.pesquisa) == 0 && $scope.filtroPopular === "acao" ||
            log.id.indexOf($scope.pesquisa) == 0 && $scope.filtroPopular === "id" ||
            log.datas.indexOf($scope.pesquisa) == 0 && $scope.filtroPopular === "datas" ||
            log.ip.indexOf($scope.pesquisa) == 0 && $scope.filtroPopular === "ip" ||
            log.criticidade.indexOf($scope.pesquisa) == 0 && $scope.filtroPopular === "criticidade"
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
