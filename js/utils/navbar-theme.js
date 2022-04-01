const menu = document.querySelector(".menu-icon");
const menuClose = document.querySelector(".close-container");
const navItemsContainer = document.querySelector(".nav-items");
const theme = document.querySelector(".theme");
const currentLocation = document.querySelector(".current-location");

theme.addEventListener("click", () => {
  document.body.classList.toggle("light");

  if (theme.classList.contains("wi-day-sunny")) {
    theme.classList.replace("wi-day-sunny", "wi-night-clear");
  } else {
    theme.classList.replace("wi-night-clear", "wi-day-sunny");
  }
  navItemsContainer.classList.remove("show");
});

menu.addEventListener("click", () => {
  navItemsContainer.classList.add("show");
});

menuClose.addEventListener("click", () => {
  navItemsContainer.classList.remove("show");
});

currentLocation.addEventListener("click", () => {
  navItemsContainer.classList.remove("show");
});
