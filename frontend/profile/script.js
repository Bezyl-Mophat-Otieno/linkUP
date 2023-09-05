const sales = document.querySelector("#sales");
const orders = document.querySelector("#orders");
const rightNav = document.querySelector(".rightNav");

sales.addEventListener("click", () => {
  rightNav.classList.add("d-none");
});

orders.addEventListener("click", () => {
  rightNav.classList.add("d-none");
});
