class WeatherAPI {
  constructor() {
    this.view = null;
    this.url = "";
    this.cityName = "";
    this.lat = "";
    this.lon = "";
    this.getUserLocation();
    this.error_message = "";
  }

  setView(view) {
    this.view = view;
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.lat = position.coords.latitude;
          this.lon = position.coords.longitude;
        },
        () => {
          this.error_message =
            "Error: geolocation deactivated, check your chrome configuration to reactivate it";
        }
      );
    }
  }

  getWeather(isLocal) {
    if (!isLocal) {
      this.cityName = this.view.inputSearch.value;
      if (this.cityName === "") {
        this.error_message = "Error: fill the input with a city name";
        return {
          error: true,
          error_message: this.error_message,
        };
      }
      this.url = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=61926bffea0cdeaadd04d42686eb0821&units=metric`;

      return this.fetchWeather(this.url);
    } else {
      if (this.lon === "" && this.lat === "") {
        this.error_message =
          "Error: geolocation deactivated, check your chrome configuration to reactivate it";
        return {
          error: true,
          error_message: this.error_message,
        };
      }
      this.url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=61926bffea0cdeaadd04d42686eb0821&units=metric`;

      return this.fetchWeather(this.url);
    }
  }

  async fetchWeather(url) {
    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("City not founded");
      }

      const data = await res.json();
      return {
        weather_description: data.weather[0].description,
        temp: data.main.temp,
        icon: data.weather[0].icon,
        location: {
          city_name: data.name,
          country_name: data.sys.country,
        },
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed,
      };
    } catch (error) {
      this.error_message = error;
      return {
        error: true,
        error_message: this.error_message,
      };
    }
  }
}

export default WeatherAPI;
