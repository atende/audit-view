'use strict';

/**
 * @ngdoc overview
 * @name auditionApp
 * @description
 * # auditionApp
 *
 * Modulo principal do cliente
 */
angular
  .module('auditionApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/visualizar', {
        templateUrl: 'views/visualizar.html',
        controller: 'VisualizarCtrl',
        controllerAs: 'visualizar'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
