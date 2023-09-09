const sales = document.querySelector("#sales");
const posts = document.querySelector("#posts");
const orders = document.querySelector("#orders");
const rightNav = document.querySelector(".rightNav");
const followersBtn = document.querySelector(".followersBtn");
const profileSection = document.querySelector(".profileSection");
window.onload = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return (window.location.href = "/frontend/login/index.html");
  }
  fetchUser(token);
};

const logoutBtn = document.querySelector("#logout");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "/frontend/login/index.html";
});

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

// Fetch Logged In User

const fetchUser = async (token) => {
  try {
    const res = await fetch(
      "http://localhost:5000/api/v1/users/getLoggedUser",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );

    const data = await res.json();
    const user = data.user;
    console.log(data);
    profileSection.innerHTML = `
    <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" srcset="">
    <h5 class="name">Bezyl Mophat Otieno</h5>
    <h5 class="username">@${user.username}</h5>
    <h5 class="role">UX/UI Design</h5>
    `;
  } catch (error) {
    console.log(error);
  }
};
