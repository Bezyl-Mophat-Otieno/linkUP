const login = document.querySelector(".btn-primary");

login.addEventListener("click", (e) => {
  e.preventDefault();
  window.location = "http://127.0.0.1:5500/frontend/user-dashboard/index.html";
});
