window.onload = async () => {
  localStorage.getItem("token")
    ? null
    : (window.location.href = "/frontend/login/index.html");
  await fetchUser(localStorage.getItem("token"));
  await fetchOrder();
};

const id = localStorage.getItem("user_id");
console.log(id);
const customerDetails = document.querySelector(".customerDetails");
const orders = document.querySelector(".orders");
const logout = document.querySelector("#logout");

logout.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.reload();
});

const fetchUser = async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/v1/users/get/${id}`);
    const data = await res.json();
    console.log(data);
    customerDetails.innerHTML = `  

    <div class="userName">${data.user.username}</div>
        <div class="email">${data.user.email}</div>
    
    `;
  } catch (error) {
    console.log(error);
  }
};

const fetchOrder = async () => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/v1/products/order/${id}`
    );
    const data = await res.json();
    console.log(data);
    const products = data.products;
    products.forEach((product, index) => {
      const date = Intl.DateTimeFormat("en-US").format(product.createdAt);
      orders.innerHTML += `
      <tr>
      <td>${product.name}</td>
      <td>${date}</td>
      <td>${product.price}</td>
    </tr>

      `;
    });
  } catch (error) {
    console.log(error);
  }
};
