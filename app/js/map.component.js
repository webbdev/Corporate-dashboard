(function() {

'use strict';

// Define the 'employeeMap' module
angular.module('employeeMap', []);

// Register 'employeeMap' component, along with its associated controller and template
angular.
  module('employeeMap').
  component('employeeMap', {
    templateUrl: 'templates/employee-map.html',
    controller: ['$http', '$interval', '$timeout', function employeeMapController($http, $interval, $timeout) {
      var self = this;

      var getMapData = $interval(function getMapData() {
        $http.get('data/map-data.json').then(function(response) {
          self.mapsData = response.data;
        });
        return getMapData;
      }(), 5000);

      self.$onDestroy = function() {
        if(getMapData) {
          $interval.cancel(getMapData);
        }       
      };

    }]
  })

  // add Map
  .component('hcChartMap', {
    require: {
      parent: '^employeeMap'
    },
    bindings: {
      options: '='
    },
    template: '<div id="container"></div>',
    controller: ['$http', '$interval', '$timeout', function myMapController($http, $interval, $timeout) {
      var self = this;

      var getMap = $interval(function getMap() {
        $http.get('data/map.json').success(function(data, status) {
          
          self.chartOptions = new Highcharts.Map({
            title: {
              style: {
                color: '#efefff',
                font: '16px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
              },
              text: '<b>Employee Count</b>'
            },
            chart: {
              renderTo: 'container',
              backgroundColor: {
                linearGradient: {
                  x1: 0,
                  y1: 0,
                  x2: 0,
                  y2: 1
                },
                stops: [
                  [0, '#3c8dbc'],
                  [1, '#e8ebec']
                ]
              },
              borderWidth: 0,
              borderRadius: 0,
              plotBackgroundColor: null,
              plotShadow: false,
              plotBorderWidth: 0
            },
            mapNavigation: {
              enabled: true,
              buttonOptions: {
                  verticalAlign: 'bottom',
                  theme: {
                    fill: '#008d4c',
                    'stroke-width': 1,
                    stroke: '#efefef',
                    r: 0,
                    states: {
                      hover: {
                        fill: '#425760'
                      }
                    }
                  },
              },
              buttons: {
                zoomIn: {
                  style: {
                    color: '#fff'
                  }
                },
                zoomOut: {
                  style: {
                    color: '#fff'
                  }
                }
              },
              enableDoubleClickZoomTo: true
            },
            colorAxis: {
              min: 0,
              stops: [
                [0, '#efefff'],
                [0.2, '#526269'],
                [1, '#222d32']
              ]
            },
            series: [{
              data: data,
              mapData: Highcharts.maps['custom/world'],
              joinBy: ['iso-a2', 'code'],
              name: 'Employees',
              states: {
                hover: {
                  color: '#008d4c'
                }
              },
              tooltip: {
                headerFormat: '',
                pointFormat: '<b>{point.name}: {point.value:.f}</b> {series.name}<br>'
              }
            }]
          });
        }).error(function(error) {
            console.log(error);
        }); 
          return getMap;
      }(), 5000); 

      self.$onDestroy = function() {
        if(getMap) {
          $interval.cancel(getMap);
        }       
      };
       
    }]
  }) // end 'the Map'


  .filter('sumByKey', function () {
    return function (data, key) {
      if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
        return 0;
      }

      var sum = 0;
      for (var i = data.length - 1; i >= 0; i--) {
        sum += parseInt(data[i][key]);
      }
      return sum;
    };
  });


})();