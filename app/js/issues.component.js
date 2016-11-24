(function() {

'use strict';

// Define the 'myIssues' module
angular.module('myIssues', []);

// Register 'myIssues' component, along with its associated controller and template
angular.
  module('myIssues').
  component('myIssues', {
    templateUrl: 'templates/issues.html',
    controller: ['$http', '$interval', function myIssuesController($http, $interval) {
      var self = this;

      var dataTable = $interval(function dataTable() {
        $http.get('data/data-table.json').then(function(response) {
          self.issuesData = response.data;
        });
        return dataTable;
      }(), 5000);

      self.$onDestroy = function() {
        if(dataTable)
            $interval.cancel(dataTable);   
      };
      
    }]
  })

})();