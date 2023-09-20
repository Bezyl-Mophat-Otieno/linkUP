// fetch the product with the id
window.onload = async () => {
  localStorage.getItem("token")
    ? null
    : (window.location.href = "/frontend/login/index.html");
  await fetchProduct();
};

const logoutBtn = document.querySelector("#logout");
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "/frontend/login/index.html";
});
const productContainer = document.querySelector(".card");
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
    <div class="card-body">
            <div class="card-header">
              <span class="material-symbols-outlined"> qr_code </span>
              <a class="nav-link active" aria-current="page" href="#"
                >${product.name}</a
              >
            </div>
            <p class="card-text">
              ${product.description}
            </p>
          </div>
          <img
            class="card-img-top img-custom"
            src=${product.image}
            alt="Card image cap"
          />
          <div class="call-to-action">
            <h5 class="price h5">KSH.${product.price}/=</h5>
            <button class="buy btn btn-outline-primary rounded">Add To Cart</button>
            <button class="contact-seller btn btn-outline-secondary rounded">
              Contact Seller
            </button>
          </div>
        `;
  }
  productContainer.innerHTML = html;
};

// Add to cart
main.addEventListener("click", (e) => {
  if (e.target.classList.contains("buy")) {
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
