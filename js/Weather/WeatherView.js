class WeatherView {
  constructor() {
    this.api = null;
    this.weather = "";
    this.inputSearch = document.getElementById("search-input");
    this.buttonSearch = document.getElementById("search-button");
    this.buttonSearchCurrentLocation =
      document.querySelector(".current-location");

    // view elements
    this.weatherDescription = document.querySelector(".weather");
    this.temp = document.querySelector(".temp");
    this.cityName = document.querySelector(".city");
    this.pressure = document.querySelector(".pressure");
    this.humidity = document.querySelector(".humidity");
    this.windSpeed = document.querySelector(".wind-speed");
    this.icon = document.getElementById("icon");
    this.blocks = document.querySelector(".blocks");
    this.greeting = document.querySelector(".greeting");
    this.toast = document.querySelector(".toast");
    this.toastMessage = document.querySelector(".error-message");

    this.buttonSearch.addEventListener("click", () => {
      this.displayWeather(false);
    });

    this.buttonSearchCurrentLocation.addEventListener("click", () => {
      this.displayWeather(true);
    });
  }

  changeIcon(iconCode) {
    let icons = {
      "01d": '<i class="wi wi-day-sunny"></i>',
      "02d": '<i class="wi wi-day-cloudy"></i>',
      "03d": '<i class="wi wi-day-cloudy"></i>',
      "04d": '<i class="wi wi-cloudy-gusts"></i>',
      "09d": '<i class="wi wi-day-rain"></i>',
      "10d": '<i class="wi wi-day-rain"></i>',
      "13d": '<i class="wi wi-day-snow"></i>',
      "50d": '<i className="wi wi-day-fog"></i>',
      "01n": '<i class="wi wi-night-clear"></i>',
      "02n": '<i class="wi wi-night-alt-cloudy"></i>',
      "03n": '<i class="wi wi-night-alt-cloudy"></i>',
      "04n": '<i class="wi wi-night-alt-cloudy"></i>',
      "09n": '<i class="wi wi-night-alt-rain"></i>',
      "10n": '<i class="wi wi-night-alt-rain"></i>',
      "13n": '<i class="wi wi-night-snow"></i>',
      "50n": '<i class="wi wi-night-fog"></i>',
    };
    return icons[iconCode]
  }

  setAPI(api) {
    this.api = api;
  }

  setWeather(weather) {
    if (weather.error) {
      this.toast.classList.add("show-error");
      this.toastMessage.textContent = weather.error_message;
      setTimeout(() => {
        this.toast.classList.remove("show-error");
      }, 5000);
      this.inputSearch.value = "";
      return;
    }

    [
      this.icon,
      this.weatherDescription,
      this.cityName,
      this.temp,
      this.pressure,
      this.humidity,
      this.windSpeed,
    ].forEach((el) => (el.style.display = "block"));

    this.blocks.style.display = "flex";

    this.greeting.style.display = "none";

    this.weatherDescription.textContent = weather.weather_description;
    this.icon.innerHTML = this.changeIcon(weather.icon);
    this.temp.innerHTML = `${weather.temp}&deg;C`;
    this.cityName.textContent = `${weather.location.city_name} / ${weather.location.country_name}`;
    this.pressure.textContent = `${weather.pressure} kPa`;
    this.humidity.textContent = `${weather.humidity}%`;
    this.windSpeed.textContent = `${weather.wind_speed} km/h`;

    this.inputSearch.value = "";
  }

  async displayWeather(isLocal) {
    if (!isLocal) {
      this.weather = await this.api.getWeather(false);
      this.setWeather(this.weather);
    } else {
      this.weather = await this.api.getWeather(true);
      this.setWeather(this.weather);
    }
  }
}

export default WeatherView;
