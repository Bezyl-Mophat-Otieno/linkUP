window.onload = async () => {
  localStorage.getItem("token")
    ? null
    : (window.location.href = "/frontend/login/index.html");
  await fetchOrder();
};

const id = localStorage.getItem("user_id");
console.log(id);
const ordersContainer = document.querySelector(".orders");
const logout = document.querySelector("#logout");

logout.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.reload();
});

const fetchOrder = async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/v1/products/order`);
    const data = await res.json();
    console.log(data);
    const orders = data.orders;
    orders.forEach((order, index) => {
      const date = Intl.DateTimeFormat("en-US").format(order.createdAt);
      ordersContainer.innerHTML += `
      <tr>
      <td>${order.username}</td>
      <td>${order.id}</td>
      <td>${order.quantity}</td>
      <td>${order.price}</td>
      <td>${date}</td>
    </tr>

      `;
    });
  } catch (error) {
    console.log(error);
  }
};
