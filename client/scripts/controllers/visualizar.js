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

    $scope.popular = function () {
      $scope.filtro[$scope.radio_filtro] = $scope.pesquisa;

      $http.post('rest/auditevent/search', $scope.filtro).then(function (r) {
          var data = r.data;
          $scope.eventos = data;
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

