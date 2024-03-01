const darkMode = document.querySelector(".dark-mode");
const lightMode = document.querySelector(".light-mode");
const ModeStorage = localStorage.getItem("darkMode");


if (ModeStorage) {
    document.body.classList.add("mode");
    lightMode.classList.toggle("hidden");
    darkMode.classList.toggle("hidden");
  }
  
  function toggleModeBtn() {
    lightMode.classList.toggle("hidden");
    darkMode.classList.toggle("hidden");
    document.body.classList.toggle("mode");
  }
  
  /* Mode*/
  darkMode.addEventListener("click", function () {
    toggleModeBtn();
    localStorage.setItem("darkMode", "mode");
  });
  
  lightMode.addEventListener("click", function () {
    toggleModeBtn();
    localStorage.setItem("darkMode", "");
  });