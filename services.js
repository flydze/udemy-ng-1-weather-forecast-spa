weatherApp.service('cityService', function () {
  this.city = "Santiago";
});

weatherApp.service('weatherService', ['$resource', function ($resource) {
  this.getWeather = function (city, days) {
    return $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=84a29bb569b6dca74aa27273aa6d55ad&q=" + city + "&cnt=" + days)
      .get();
  }
}]);