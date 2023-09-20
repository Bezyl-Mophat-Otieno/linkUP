const password = document.querySelector(".password");
const confirmPassword = document.querySelector(".cPassword");
const alerts = document.querySelector(".alertContainer");

const form = document.querySelector(".loginForm");
const userId = window.location.href.split("=")[1];
console.log(userId);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (password.value !== confirmPassword.value) {
    alerts.innerHTML = `<div class="alert" role="alert">Passwords do not match</div>`;
    return;
  }
  updatePassword(password.value, userId);
});

const updatePassword = async (password, userId) => {
  console.log(userId);
  const res = await fetch(
    `http://localhost:5000/api/v1/users/update/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    }
  );

  const data = await res.json();
  console.log(data);
  if (data.status === "success") {
    alerts.innerHTML = `
        <div class="alert" >
        <p>Password updated successfully!</p>
        </div>
        `;
    window.setTimeout(() => {
      window.location.href = "http://127.0.0.1:5500/frontend/login/index.html";
      alerts.innerHTML = "";
    }, 3000);
  }
};
