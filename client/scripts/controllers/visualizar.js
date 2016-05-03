'use strict';

/**
 * @ngdoc function
 * @name auditionApp.controller:VisualizarCtrl
 * @description
 * # VisualizarCtrl
 * Controller of the auditionApp
 */

// var app = angular.module('auditionApp', [ui.bootstrap]);

var app = angular.module('auditionApp');

app.controller('VisualizarCtrl', function ($scope, $http) {

    var lastChecked;

    $scope.filtro = {};

    $scope.criticidades = ["LOW", "NORMAL", "HIGHT"];
    $scope.aplicacoes = [];

    $scope.logSelecionado = null;
    $scope.indexSelecionado = null;

    $scope.filtrosDeAplicacao = [];


    $scope.eventos = [];



    $scope.paginados = [];


    $scope.currentPage = 1,
    $scope.numPerPage = 10,
    $scope.maxSize = 5;

    $scope.$watch('currentPage + numPerPage + eventos', function() {
      var begin = (($scope.currentPage - 1) * $scope.numPerPage);
      var end = begin + $scope.numPerPage;

      $scope.paginados = $scope.eventos.slice(begin, end);

    });


    $scope.clickTable = function(log) {
      $scope.logSelecionado = log;
    };


    $scope.loadApplications = function(){
      $http.get('rest/auditevent/applications').then(function(r){
        $scope.aplicacoes = r.data;
      })
    };

  $scope.teste = function(){
    bootbox.alert("Custom label text!", "Very good.");
  };

    $scope.checkDate = function(){
      var dataInicio = new Date($scope.dateStart);
      var dataFim = new Date($scope.dateEnd);
      if(dataInicio > dataFim){
        window.alert("Data Inicial tem que ser menor ou igual a Data Final.");

        return false;
      }
      return true;
    };


    $scope.searchIncludeDate = function(){

      if($scope.checkDate($scope.dateStart, $scope.dateEnd)) {
        var url = 'rest/auditevent/search/dates/' + $scope.dateStart + '/' + $scope.dateEnd;
        $http.post(url, $scope.filtro).then(function (r) {
            var data = r.data;
            $scope.eventos = data;
          }
        )
      }
    };

  $scope.searchWithoutDate = function(){
    var url = 'rest/auditevent/search';
    $http.post(url, $scope.filtro).then(function (r) {
        var data = r.data;
        $scope.eventos = data;
      }
    )
  };

    $scope.popular = function () {

      if($scope.checkDate($scope.dateStart, $scope.dateEnd))
        $http.post('rest/auditevent/search', $scope.filtro).then(function (r) {
            var data = r.data;
            $scope.eventos = data;
          }
        );

    };

  });

