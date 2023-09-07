const sales = document.querySelector("#sales");
const posts = document.querySelector("#posts");
const orders = document.querySelector("#orders");
const rightNav = document.querySelector(".rightNav");
const followersBtn = document.querySelector(".followersBtn");

sales.addEventListener("click", () => {
  rightNav.classList.add("d-none");
});

orders.addEventListener("click", () => {
  rightNav.classList.add("d-none");
});
posts.addEventListener("click", () => {
  rightNav.classList.add("d-none");
});
followersBtn.addEventListener("click", () => {
  window.location.reload();
});
