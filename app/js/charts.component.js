(function() {

'use strict';

// Define the 'keyMetrics' module
angular.module('keyMetrics', []);

// Register 'keyMetrics' component, along with its associated controller and template
angular.
  module('keyMetrics').
  component('keyMetrics', {
    templateUrl: 'templates/key-metrics.html',
    controller: ['$timeout', function keyMetricsController($timeout) {
      var self = this; 
    }]
  })

  // Live Issues Count Chart
  .component('hcChartLive1', {
    require: {
      parent: '^keyMetrics'
    },
    bindings: {
      options: '='
    },
    template: '<div id="issues-chart-live"></div>',
    controller: ['$interval', '$timeout', function myChartLiveController($interval, $timeout) {
      var self = this;

      var issuesLiveChart = $timeout(function issuesLiveChart() {
        self.chartOptions = new Highcharts.chart({
          chart: {
            renderTo: 'issues-chart-live',
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
            enabled: true
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


  /*--- Reported Issues chart1 ---*/
  .component('hcChart', {
    require: {
      parent: '^keyMetrics'
    },
    bindings: {
      options: '='
    },
    template: '<div id="issues-chart1"></div>',
    controller: ['$http', '$interval', '$timeout', function myChart1Controller($http, $interval, $timeout) {
      var self = this;
       
      var issuesChart1 = $interval(function issuesChart1() {
        self.chartOptions = {
          chart: {
            renderTo: 'issues-chart1',
            type: 'column',
            style: {
              color: '#555',
              font: '16px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
            }
          },
          title: {
            text: 'Reported Issues, 2016',
            style: {
              fontWeight: 'bold'
            }
          },
          xAxis: {
            categories: []
          },
          yAxis: {
            title: {
              text: null
            }
          },
          plotOptions: {
            series: {
              animation: false
            }
          },
          series: []
        };
        // Load the data from the CSV file.
        $http.get('data/issues-month.csv').success(function(data) {
          // Split the lines
          var lines = data.split('\n');
          $.each(lines, function(lineNo, line) {
            var items = line.split(',');
            // header line containes categories
            if (lineNo == 0) {
              $.each(items, function(itemNo, item) {
                if (itemNo > 0) self.chartOptions.xAxis.categories.push(item);
              });
            }
            // the rest of the lines contain data with their name in the first position
            else {
              var series = { 
                data: []
              };
              $.each(items, function(itemNo, item) {
                if (itemNo == 0) {
                  series.name = item;
                } else {
                  series.data.push(parseFloat(item));
                }
              });
              self.chartOptions.series.push(series);
            }
          });
          self.chart = new Highcharts.Chart(self.chartOptions);

        }).error(function(error) {
            console.log(error);
          });

        return issuesChart1;  
      }(), 5000); 

      self.$onDestroy = function() {
        if(issuesChart1) {
          $interval.cancel(issuesChart1);
        }       
      };

    }]
  }) // End 'Reported Issues chart1'


  /*--- Company Issues chart ---*/
  .component('hcChartLine', {
    require: {
      parent: '^keyMetrics'
    },
    bindings: {
      options: '='
    },
    template: '<div id="issues-chart2"></div>',
    controller: ['$http', '$interval', '$timeout', function myChart2Controller($http, $interval, $timeout) {
      var self = this;
       
      var issuesChart2 = $interval(function issuesChart2() {
        self.chartOptions = {
          chart: {
            renderTo: 'issues-chart2',
            type: 'line',
            style: {
              color: '#555',
              font: '16px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
            }
          },
          title: {
            text: 'Company Issues, 2016',
            style: {
              fontWeight: 'bold'
            }
          },
          xAxis: {
            categories: []
          },
          yAxis: {
            title: {
              text: null
            }
          },
          plotOptions: {
            series: {
              animation: false
            }
          },
          series: []
        };
        // Load the data from the CSV file.
        $http.get('data/company-issues.csv').success(function(data) {
          // Split the lines
          var lines = data.split('\n');
          $.each(lines, function(lineNo, line) {
            var items = line.split(',');
            // header line containes categories
            if (lineNo == 0) {
              $.each(items, function(itemNo, item) {
                if (itemNo > 0) self.chartOptions.xAxis.categories.push(item);
              });
            }
            // the rest of the lines contain data with their name in the first position
            else {
              var series = { 
                data: []
              };
              $.each(items, function(itemNo, item) {
                if (itemNo == 0) {
                  series.name = item;
                } else {
                  series.data.push(parseFloat(item));
                }
              });
              self.chartOptions.series.push(series);
            } 
          });
          self.chart = new Highcharts.Chart(self.chartOptions);
        });

         return issuesChart2; 
      }(), 5000);

      self.$onDestroy = function() {
        if(issuesChart2) {
          $interval.cancel(issuesChart2);
        }       
      };

    }]
  }) // End 'Company Issues chart2'


  /*--- Paying Customers chart ---*/
  .component('hcChartArea', {
    require: {
      parent: '^keyMetrics'
    },
    bindings: {
      options: '='
    },
    template: '<div id="paying-cust-chart"></div>',
    controller: ['$http', '$interval', '$timeout', function myChart3Controller($http, $interval, $timeout) {
      var self = this;

      var customersChart = $interval(function customersChart() {
        self.chartOptions = {
          chart: {
            renderTo: 'paying-cust-chart',
            type: 'area',
            style: {
              color: '#555',
              font: '16px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
            }
          },
          title: {
            text: 'Paying Customers, 2016',
            style: {
              fontWeight: 'bold'
            }
          },
          xAxis: {
            categories: []
          },
          yAxis: {
            title: {
              text: null
            }
          },
          plotOptions: {
            series: {
              animation: false
            }
          },
          series: []
        };
        // Load the data from the CSV file.
        $http.get('data/customers.csv').success(function(data) {
          // Split the lines
          var lines = data.split('\n');
          $.each(lines, function(lineNo, line) {
            var items = line.split(',');
            
            // header line containes categories
            if (lineNo == 0) {
              $.each(items, function(itemNo, item) {
                if (itemNo > 0) self.chartOptions.xAxis.categories.push(item);
              });
            }
            // the rest of the lines contain data with their name in the first position
            else {
              var series = { 
                data: []
              };
              $.each(items, function(itemNo, item) {
                if (itemNo == 0) {
                  series.name = item;
                } else {
                  series.data.push(parseFloat(item));
                }
              });
              self.chartOptions.series.push(series);
            }
            
          });
          self.chart = new Highcharts.Chart(self.chartOptions);
        });
         return customersChart; 
      }(), 5000); 

      self.$onDestroy = function() {
        if(customersChart) {
          $interval.cancel(customersChart);
        }       
      };

    }]
  }) // End 'Paying Customers chart'


  /*--- Paying Customers chart2 ---*/
  .component('hcChartColumn', {
    require: {
      parent: '^keyMetrics'
    },
    bindings: {
      options: '='
    },
    template: '<div id="paying-cust-chart2"></div>',
    controller: ['$http', '$interval', '$timeout', function myChart4Controller($http, $interval, $timeout) {
      var self = this;
      
      var customersChart2 = $interval(function customersChart2() {
        self.chartOptions = {
          chart: {
            renderTo: 'paying-cust-chart2',
            type: 'column',
            style: {
              color: '#555',
              font: '16px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
            }
          },
          title: {
            text: 'Paying Customers, 2016',
            style: {
              fontWeight: 'bold'
            }
          },
          xAxis: {
            categories: []
          },
          yAxis: {
            title: {
              text: null
            }
          },
          plotOptions: {
            series: {
              animation: false
            }
          },
          series: []
        };
        // Load the data from the CSV file.
        $http.get('data/customers-month.csv').success(function(data) {
          // Split the lines
          var lines = data.split('\n');
          $.each(lines, function(lineNo, line) {
            var items = line.split(','); 
            // header line containes categories
            if (lineNo == 0) {
              $.each(items, function(itemNo, item) {
                if (itemNo > 0) self.chartOptions.xAxis.categories.push(item);
              });
            }
            // the rest of the lines contain data with their name in the first position
            else {
              var series = { 
                data: []
              };
              $.each(items, function(itemNo, item) {
                if (itemNo == 0) {
                  series.name = item;
                } else {
                  series.data.push(parseFloat(item));
                }
              });
              self.chartOptions.series.push(series);
            }
          });
          
          self.chart = new Highcharts.Chart(self.chartOptions);
        });
         return customersChart2; 
      }(), 5000);

      self.$onDestroy = function() {
        if(customersChart2) {
          $interval.cancel(customersChart2);
        }       
      };

    }]
  }) // End 'Paying Customers chart2'

  
})();