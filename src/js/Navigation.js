//*MENU
const randomMenu = document.querySelector("#randomMenu");
const favoritesMenu = document.querySelector("#favoritesMenu");
const UploadMenu = document.querySelector("#UploadMenu");
//*MENU RESPONSIVE
const randomMenuRes = document.querySelector("#randomMenuRes");
const favoritesMenuRes = document.querySelector("#favoritesMenuRes");
const uploadMenuRes = document.querySelector("#uploadMenuRes");
const menu_responsive = document.querySelector(".menu_responsive");
//*SECTIONS
const randomSection = document.querySelector(".main__randomImages");
const favoritesSection = document.querySelector(".main__favorites");
const uploadSection = document.querySelector(".main__upload");
//*NAVIGATION MENU
randomMenu.addEventListener("click", () => {
  console.log("randomMenu");
  randomSection.style.display = "flex";
  favoritesSection.style.display = "none";
  uploadSection.style.display = "none";
});
favoritesMenu.addEventListener("click", () => {
  console.log("favoritesMenu");
  randomSection.style.display = "none";
  favoritesSection.style.display = "flex";
  uploadSection.style.display = "none";
});
UploadMenu.addEventListener("click", () => {
  console.log("UploadMenu");
  randomSection.style.display = "none";
  favoritesSection.style.display = "none";
  uploadSection.style.display = "flex";
});
//*NAVIGATION MENU RESPONSIVE
randomMenuRes.addEventListener("click", () => {
  console.log("randomMenuRes");
  randomSection.style.display = "flex";
  favoritesSection.style.display = "none";
  uploadSection.style.display = "none";
  menu_responsive.classList.toggle("Activate-menu_responsive");
});
favoritesMenuRes.addEventListener("click", () => {
  console.log("favoritesMenuRes");
  randomSection.style.display = "none";
  favoritesSection.style.display = "flex";
  uploadSection.style.display = "none";
  menu_responsive.classList.toggle("Activate-menu_responsive");
});
uploadMenuRes.addEventListener("click", () => {
  console.log("UploadMenuRes");
  randomSection.style.display = "none";
  favoritesSection.style.display = "none";
  uploadSection.style.display = "flex";
  menu_responsive.classList.toggle("Activate-menu_responsive");
});
