const menu = document.querySelector(".btn__menuRes");
const line1Bars = document.querySelector(".bar1__menu");
const line2Bars = document.querySelector(".bar2__menu");
const line3Bars = document.querySelector(".bar3__menu");
const menuList = document.querySelector(".menu_responsive");

function animateBars() {
  line1Bars.classList.toggle("Activate-bar1__menu");
  line2Bars.classList.toggle("Activate-bar2__menu");
  line3Bars.classList.toggle("Activate-bar3__menu");
  menuList.classList.toggle("Activate-menu_responsive");
}

menu.addEventListener("click", animateBars);
