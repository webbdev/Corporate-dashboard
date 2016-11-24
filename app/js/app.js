(function() {

'use strict';

// Define the 'dashboardApp' module
var app = angular.module('dashboardApp', [
  'ngRoute',
  'mainDashboard',
  'employeeMap',
  'keyMetrics',
  'myIssues', 
  'ngResource',
  'angularUtils.directives.dirPagination'
])

  .config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/dashboard', {
          template: '<main-dashboard></main-dashboard>'
        }).
        when('/map', {
          template: '<employee-map></employee-map>'
        }).
        when('/charts', {
          template: '<key-metrics></key-metrics>'
        }).
        when('/issues', {
          template: '<my-issues></my-issues>'
        }).
        otherwise('/dashboard');
    }

  ]);


})();

