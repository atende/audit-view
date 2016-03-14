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
        return log.aplicacao.indexOf($scope.pesquisa) == 0 ||
            log.usuario.indexOf($scope.pesquisa) == 0 ||
            log.acao.indexOf($scope.pesquisa) == 0 ||
            log.datas.indexOf($scope.pesquisa) == 0 ||
            log.ip.indexOf($scope.pesquisa) == 0 ||
            log.criticidade.indexOf($scope.pesquisa) == 0;
      }
      return true;
    };

    $scope.logs = [
      {
        aplicacao: "Mapa PUC",
        usuario: "Anderson",
        acao: "teste",
        datas: "10/03/2016 : 10:53",
        ip: "192.168.254.254",
        criticidade: "altawa"
      },
      {
        aplicacao: "Audit-Web",
        usuario: "Andersonss",
        acao: "teste",
        datas: "10/03/2016 : 10:53",
        ip: "192.168.254.254",
        criticidade: "alta"
      },
      {
        aplicacao: "SGL",
        usuario: "Anderson",
        acao: "teste",
        datas: "10/03/2016 : 10:53",
        ip: "192.168.255.254",
        criticidade: "alta"
      },
      {
        aplicacao: "SGI",
        usuario: "Anderson",
        acao: "teste",
        datas: "10/03/2016 : 10:53",
        ip: "192.167.254.254",
        criticidade: "alta"
      }
    ]

  });