const contactSeller = document.querySelector(".contact-seller");
const buy = document.querySelector(".buy");

contactSeller.addEventListener("click", () => {
  window.location.href = "http://127.0.0.1:5500/frontend/chat-room/index.html";
});

buy.addEventListener("click", () => {
  window.location.href = "http://127.0.0.1:5500/frontend/checkout/index.html";
});
