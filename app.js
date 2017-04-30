var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

weatherApp.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.htm',
      controller : 'homeController'
    })
    .when('/forecast', {
      templateUrl: 'views/forecast.htm',
      controller : 'forecastController'
    })
    .when('/forecast/:days', {
      templateUrl: 'views/forecast.htm',
      controller : 'forecastController'
    });
});

weatherApp.service('cityService', function () {
  this.city = "New York, NY";
});

weatherApp.controller('homeController', ['$scope', 'cityService', function ($scope, cityService) {
  $scope.city = cityService.city;
  $scope.$watch('city', function () {
    cityService.city = $scope.city;
  });
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function ($scope, $resource, $routeParams, cityService) {
  $scope.city = cityService.city;
  $scope.days = $routeParams.days || 2;

  $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=84a29bb569b6dca74aa27273aa6d55ad&q="+$scope.city+"&cnt="+$scope.days);

  $scope.weatherResult = $scope.weatherAPI.get();

  $scope.convertToCelcius = function (degK) {
    return Math.round(degK - 273);
  };

  $scope.convertToDate = function (dt) {
    return new Date(dt * 1000);
  }
}]);
