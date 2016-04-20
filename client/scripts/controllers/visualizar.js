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

    var lastChecked;

    $scope.filtros = [];
    $scope.filtro = {};

    $scope.criticidades = ["LOW", "NORMAL", "HIGHT"];
    $scope.aplicacoes = [];

    $scope.logSelecionado = null;
    $scope.indexSelecionado = null;

    $scope.filtrosDeAplicacao = [];

    $scope.clickTable = function(log) {
      $scope.logSelecionado = log;
    };

    $scope.eventos = [];


    $scope.loadApplications = function(){
      $http.get('rest/auditevent/applications').then(function(r){
        $scope.aplicacoes = r.data;
      })
    };

    $scope.searchIncludeDate = function(){
      console.log("Include date");
      console.log($scope.dateStart);
      console.log($scope.dateEnd);

      var url = 'rest/auditevent/search/dates/' + $scope.dateStart + '/' + $scope.dateEnd;
      $http.post(url, $scope.filtro).then(function (r) {
          var data = r.data;
          $scope.eventos = data;
          console.log($scope.eventos.length);
        }
      )
    };

  $scope.searchWithoutDate = function(){

    console.log("Without date");
    console.log($scope.dateStart);
    console.log($scope.dateEnd);

    var url = 'rest/auditevent/search';
    $http.post(url, $scope.filtro).then(function (r) {
        var data = r.data;
        $scope.eventos = data;
        console.log($scope.eventos.length);
      }
    )
  };

    $scope.popular = function () {
      // console.debug($scope.filtro);
      //
      // console.debug($scope.filtro.dateStart)
      // console.debug($scope.filtro.dateEnd)
      // console.debug($scope.filtro.timeStart)
      // console.debug($scope.filtro.timeEnd)

      $http.post('rest/auditevent/search', $scope.filtro).then(function (r) {
          var data = r.data;
          $scope.eventos = data;

          for(var i = 0; i < data.length; i++){
            // console.debug(data[i].dateTime);
          }
        }
      );

  

    }

  });

