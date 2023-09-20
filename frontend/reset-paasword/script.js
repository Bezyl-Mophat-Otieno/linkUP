const email = document.querySelector(".email");
const form = document.querySelector(".loginForm");
const alerts = document.querySelector(".alertContainer");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (email.value === "") {
    alerts.innerHTML = `
    
    <div class="alert" >
    Please fill in all fields
    </div>

    `;

    setTimeout(() => {
      alerts.innerHTML = "";
    }, 2000);
  } else {
    await verifyEmail(email.value);
  }
});

const verifyEmail = async (email) => {
  const res = await fetch("http://localhost:5000/api/v1/users/resetPassword", {
    method: "POST",
    body: JSON.stringify({ email: email }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  console.log(data);
  if (data.status === "success") {
    alerts.innerHTML = `
    <div class="alert" >
    <p>An email has been sent to your email address. Please check your inbox.</p>
    </div>
    `;
    window.setTimeout(() => {
      location.assign("http://127.0.0.1:5500/frontend/login/index.html?");
      alerts.innerHTML = "";
    }, 3000);
  }
};
