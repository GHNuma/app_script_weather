function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Weather App')
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function submitForm(name, city) {
  var weatherData = fetchWeather(city);
  var message = '';

  if (weatherData.cod == 200) {
    var temperature = weatherData.main.temp;
    var humidity = weatherData.main.humidity;
    var windSpeed = weatherData.wind.speed;
    var description = weatherData.weather[0].description;
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([name, city, temperature + '°C', humidity + '%', windSpeed + ' m/s', description]);
    message = 'Data submitted successfully!';
  } else {
    message = 'Failed to fetch weather data. Please check your input.';
  }

  return { message: message, weatherData: weatherData }; // Return both message and weather data
}

function fetchWeather(city) {
  var apiKey = '70ec85527885eb438ebf499797831276'; // Replace with your OpenWeatherMap API key
  var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey + '&units=metric';
  var response = UrlFetchApp.fetch(url);
  var json = response.getContentText();
  var data = JSON.parse(json);
  return data;
}
