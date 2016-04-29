// 'use strict';

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
      // console.debug($scope.filtro);
      //
      // console.debug($scope.filtro.dateStart)
      // console.debug($scope.filtro.dateEnd)
      // console.debug($scope.filtro.timeStart)
      // console.debug($scope.filtro.timeEnd)

      if($scope.checkDate($scope.dateStart, $scope.dateEnd))
        $http.post('rest/auditevent/search', $scope.filtro).then(function (r) {
            var data = r.data;
            $scope.eventos = data;
          }
        );

    };

  $scope.filteredTodos = [],
  $scope.currentPage = 1,
  $scope.numPerPage = 10,
  $scope.maxSize = 5;

  $scope.makeTodos = function() {
    $scope.todos = [];
    for (var i=1;i<=1000;i++) {
      $scope.todos.push({ text:'todo '+i, done:false});
    }
  };
  $scope.makeTodos();

  $scope.numPages = function () {
    return Math.ceil($scope.todos.length / $scope.numPerPage);
  };

  $scope.$watch('currentPage + numPerPage', function() {
    var begin = (($scope.currentPage - 1) * $scope.numPerPage), end = begin + $scope.numPerPage;

    $scope.filteredTodos = $scope.todos.slice(begin, end);
  });

  });

