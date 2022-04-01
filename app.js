import './js/utils/navbar-theme.js';
import WeatherAPI from './js/Weather/WeatherAPI.js';
import WeatherView from './js/Weather/WeatherView.js';

const weatherAPI = new WeatherAPI();
const weatherView = new WeatherView();

// connecting REST API with WeatherView
weatherView.setAPI(weatherAPI);
weatherAPI.setView(weatherView);