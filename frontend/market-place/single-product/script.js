// fetch the product with the id
const profile = document.querySelector(".profile");
window.onload = async () => {
  await fetchProduct();
  const username = localStorage.getItem("username");
  if (username !== null || username == "") {
    profile.innerHTML = username;
  }
};
const main = document.querySelector(".main");
const productId = window.location.search.split("=")[1];

let product;
const fetchProduct = async () => {
  let html = "";
  const res = await fetch(
    `http://localhost:5000/api/v1/products/get/${productId}`
  );
  const object = await res.json();
  console.log(object);
  if (object.status == "success") {
    product = object.product;
    html += `
    <div class="product-img">
    <img
      src=${product.image}
      alt=""
      class="img"
    />
  </div>
  <div class="product-details">
    <div class="product-name">${product.name}</div>
    <div class="product-desc">
    ${product.description}
    </div>
    <div class="details">
      <div class="price">KSH.${product.price}/=</div>
    </div>
    <button class="action-btn">Add To Cart</button>
  </div>
        `;
  }
  main.innerHTML = html;
};

// Add to cart
main.addEventListener("click", (e) => {
  if (e.target.classList.contains("action-btn")) {
    // const product = JSON.parse(localStorage.getItem("product"));
    const cart = JSON.parse(localStorage.getItem("cart"));
    const productId = window.location.search.split("=")[1];
    const productInCart = cart.find((item) => item.id == productId);
    if (productInCart) {
      productInCart.quantity += 1;
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      product.quantity = 1;
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    window.location.href =
      "http://127.0.0.1:5500/frontend/market-place/cart/index.html";
  }
});
