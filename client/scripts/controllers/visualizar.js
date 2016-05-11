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

    $scope.filtro = {};

    $scope.criticidades = ["LOW", "NORMAL", "HIGHT"];
    $scope.aplicacoes = [];

    $scope.logSelecionado = null;
    $scope.indexSelecionado = null;

    $scope.filtrosDeAplicacao = [];


    $scope.eventos = [];

    $scope.paginados = [];


    $scope.currentPage = 1,
    $scope.numPerPage = 11,
    $scope.maxSize = 10;

    $scope.$watch('currentPage + numPerPage + eventos', function() {
      var begin = (($scope.currentPage - 1) * $scope.numPerPage);
      var end = begin + $scope.numPerPage;

      $scope.paginados = [];

      console.log("teste");

      $scope.paginados = $scope.eventos.slice(begin, end);

    });


  $scope.$watch('eventos', function() {
    var begin = (($scope.currentPage - 1) * $scope.numPerPage);
    var end = begin + $scope.numPerPage;

    $scope.paginados = [];

    console.log("teste");

    $scope.paginados = $scope.eventos.slice(begin, end);

  });

    $scope.inserindoEvento = function(){
      var json = '{  "id" : "1234",  "applicationName" : "sgl",  "userName" : "fulano",  "action" : "create",  "resource": {"resourceType": "aluno", "resourceId": "1234"},  "dateTime" : "2016-04-05T11:01:13.637",  "ip" : "192.168.254.1",  "securityLevel" : "NORMAL",  "description" : "criando aluno fulano" }';
      json = JSON.parse(json);

      console.log(json);

      $http.post('rest/auditevent/create', json).then(function (r) {
          var data = r.data;
          console.log(data);
        }
      );

    };

    $scope.clickTable = function(log) {
      $scope.logSelecionado = log;
    };


    $scope.loadApplications = function(){
      $http.get('rest/auditevent/applications').then(function(r){
        $scope.aplicacoes = r.data;
      })
    };

    $scope.checkDate = function(){
      var dataInicio = new Date($scope.dateStart);
      var dataFim = new Date($scope.dateEnd);
      if(dataInicio > dataFim){
        $('#myModal2').modal('show');
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

