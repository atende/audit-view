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

    $scope.testeData = function(){

      console.log("filtro");
      console.log($scope.filtro);
      $http.post('rest/auditevent/dates', $scope.filtro).then(function (r) {
          var data = r.data;
          $scope.eventos = data;
          console.log($scope.eventos.length);
        }
      )
    };

    $scope.popular = function () {
      console.debug($scope.filtro);

      console.debug($scope.filtro.dateStart)
      console.debug($scope.filtro.dateEnd)
      console.debug($scope.filtro.timeStart)
      console.debug($scope.filtro.timeEnd)

      $http.post('rest/auditevent/search', $scope.filtro).then(function (r) {
          var data = r.data;
          $scope.eventos = data;

          for(var i = 0; i < data.length; i++){
            console.debug(data[i].dateTime);
          }
        }
      );

      // $.ajax({
      //   type: "POST",
      //   contentType: "application/json",
      //   url: "http://localhost:8080/rest/auditevent/search",
      //   data: JSON.stringify(filtro),
      //   dataType: 'json',
      //   success: function (data) {
      //     for(var i = 0; i < data.length; i++){
      //       $scope.eventos[i] = data[i];
      //       console.log($scope.eventos[i]);
      //     }
      //   }
      // });

    }

  });

