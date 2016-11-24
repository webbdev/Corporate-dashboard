(function() {

'use strict';

// Define the 'mainDashboard' module
angular.module('mainDashboard', []);

// Register 'mainDashboard' component, along with its associated controller and template
angular.
  module('mainDashboard').
  component('mainDashboard', {
    templateUrl: 'templates/main-dashboard.html',
    controller: ['$timeout', '$interval', function mainDashboardController($timeout, $interval) {
      var self = this;

        self.counter = 1734;
        var updateCounter = function() {
          self.counter++;
          $timeout(updateCounter, 2000);
        };
        updateCounter();
    }]
  })

  /*--- Live Issues Count Chart ---*/
  .component('hcChartLive', {   
    bindings: {
      options: '='
    },
    template: '<div id="container-issues-live"></div>',
    controller: ['$interval', '$timeout', function chart1Controller($interval, $timeout) {
      var self = this;

      var issuesLiveChart = $timeout(function issuesLiveChart() {  
        self.chartOptions = new Highcharts.chart({
          chart: {
            renderTo: 'container-issues-live',
            type: 'line',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
              load: function () {
                // set up the updating of the chart each second
                var series = this.series[0];
                setInterval(function () {
                  var x = (new Date()).getTime(), // current time
                   max = 100,
                   min = 30,
                   y =  Math.floor(Math.random() * (max - min + 1)) + min;
                  series.addPoint([x, y], true, true);
                }, 2000);
              }
            }
          },
          title: {
            text: 'Live Issues Count',
            style: {
              fontWeight: 'bold'
            }
          },
          xAxis: {
            type: 'datetime',
            tickPixelInterval: 600
          },
          yAxis: {
            minPadding: 0.2,
            maxPadding: 0.2,
            title: {
              text: null
            },
            plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
            }]
          },
          legend: {
            enabled: false
          },
          exporting: {
            enabled: false
          },
          series: [{
            name: 'Issues',
            data: (function () {
              // generate an array of random data
              var data = [],
                  time = (new Date()).getTime(),
                  i;

              for (i = -19; i <= 0; i += 1) {
                  data.push({
                    x: time + i * 2000,
                      y: 30 + Math.random()
                  });
              }
              return data;
            }())
          }]
        });
        return issuesLiveChart;
      }); 

      self.$onDestroy = function() {
        if(issuesLiveChart) {
          $timeout.cancel(issuesLiveChart);
        }       
      };

    }]
  }) // End 'Live Issues Count chart'


  /*--- Reported Issues chart ---*/
  .component('hcChartColmn', {
    bindings: {
      options: '='
    },
    template: '<div id="container-issues2"></div>',
    controller: ['$interval', '$timeout', function chart1Controller($interval, $timeout) {
      var self = this;  

      var chartIssues2 = $interval(function chartIssues2() {
        self.chartOptions = new Highcharts.chart({
            chart: {
              renderTo: 'container-issues2',
              type: 'column',
              options3d: {
                enabled: true,
                alpha: 10,
                beta: 20,
                depth: 70
              }
            },
            colors: ['#00a65a', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
          '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
            title: {
              text: 'Reported Issues, 2016',
              style: {
                fontWeight: 'bold'
              }
            },
            plotOptions: {
              column: {
                depth: 20
              },
              series: {
                animation: false
              }
            },
            legend: {
              enabled: false
            },
            navigation: {
              buttonOptions: {
                enabled: false
              }
            },
            xAxis: {
              categories: Highcharts.getOptions().lang.shortMonths
            },
            yAxis: {
              title: {
                text: null
              }
            },
            series: [{
              name: 'Issues',
              colorByPoint: true,
              data: [98, 152, 180, 152, 173, 169, 175, 123, 178, 187, 148]
            }]
        });
        return chartIssues2;
      }(), 5000);

      self.$onDestroy = function() {
        if(chartIssues2) {
          $interval.cancel(chartIssues2);
        }       
      };

    }]
  })  // End 'Reported Issues chart'

  
  /*--- Employee Count Map ---*/
  .component('hcChartMapsm', {
    require: {
      parent: '^mainDashboard'
    },
    bindings: {
      options: '='
    },
    template: '<div id="container-mapsmall"></div>',
    controller: ['$http', '$interval', '$timeout', function myMapsmController($http, $interval, $timeout) {
      var self = this;

      var getMapsm = $interval(function getMapsm() {
        $http.get('data/map-data.json').success(function(data, status) {
          
          self.chartOptions = new Highcharts.Map({
            chart: {
              map: 'custom/world',
              renderTo: 'container-mapsmall',
              backgroundColor: {
                linearGradient: {
                  x1: 0,
                  y1: 0,
                  x2: 0,
                  y2: 1
                },
                stops: [
                  [0, '#222d32'],
                  [1, '#616d72']
                ]
              }
            },
            title: {
              style: {
                color: '#efefff',
                font: '16px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
              },
              text: '<b>Employee Count, 2016</b>'
            },
            legend: {
              enabled: false
            },
            mapNavigation: {
              enabled: true,
                buttonOptions: {
                  verticalAlign: 'bottom'
                },
              enableDoubleClickZoomTo: true
            },
            navigation: {
              buttonOptions: {
                enabled: false
              }
            },
            series: [{
              name: 'Countries',
              color: '#E0E0E0',
              enableMouseTracking: false
            }, {
              type: 'mapbubble',
              name: 'Employees',
              joinBy: ['iso-a2', 'code'],
              data: data,
              mapData: Highcharts.maps['custom/world'],
              minSize: 3,
              maxSize: '10%',
              tooltip: {
                headerFormat: '',
                pointFormat: '<b>{point.name}: {point.value:.f}</b> {series.name}'
              }
            }]
          });
        }).error(function(error) {
            console.log(error);
          });
        return getMapsm;
      }(), 3000);

       self.$onDestroy = function() {
        if(getMapsm) {
          $interval.cancel(getMapsm);
        }       
      };

   }]
  }) // end 'Employee Count Map'


  /*-- Employee Map Chart --*/
  .component('hcChartBar', {
    require: {
      parent: '^mainDashboard'
    },
    bindings: {
      options: '='
    },
    template: '<div id="container-mapchart"></div>',
    controller: ['$http', '$interval', '$timeout', function chart3Controller($http, $interval, $timeout) {
      var self = this;

      var mapdataChart = $interval(function mapdataChart() {
        $http.get('data/map-data.json').success(function(data) {
       
          self.chartOptions = new Highcharts.chart({  
            chart: {
              renderTo: 'container-mapchart',
              type: 'bar'
            },
            title: {
              style: {
                color: '#555',
                font: '16px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
              },
              text: '<b>Employee Count, 2016</b>'
            },
            legend: {
              enabled: true
            },
            xAxis: {
              type: 'category',
              title: {
                text: null
              }
            },
            yAxis: {
              min: 0,
              title: {
                text: null,
                align: 'high'
              },
              labels: {
                overflow: 'justify'
              }
            },
            tooltip: {
              headerFormat: '',
              pointFormat: '<b>{point.name}: {point.y:.f}</b> {series.name}'
            },
            plotOptions: {
              bar: {
                dataLabels: {
                  enabled: true
                }
              },
              series: {
                animation: false
              }
            },
            credits: {
              enabled: false
            },
            navigation: {
              buttonOptions: {
                enabled: false
              }
            },
            series: [{
              name: 'Employees',
              data: data
            }]
          });
        }).error(function(error) {
            console.log(error);
          });
        return mapdataChart;
      }(), 5000);

      self.$onDestroy = function() {
        if(mapdataChart) {
          $interval.cancel(mapdataChart);
        }       
      };

    }]
  }) // End 'Employee Map Chart'

})();