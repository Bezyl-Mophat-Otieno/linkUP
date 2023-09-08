const alerts = document.querySelector(".alertContainer");
const email = document.querySelector(".email");
const username = document.querySelector(".username");
const password = document.querySelector(".password");
const password2 = document.querySelector(".confirmPassword");
const registerBtn = document.querySelector(".btn-primary");

const checkRegisterInputs = async () => {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();
  if (
    usernameValue.length == 0 ||
    emailValue.length == 0 ||
    passwordValue.length == 0
  ) {
    alerts.innerHTML = `
    <div class = "alert">
    Please fill in all fields
    </div>
    `;
  } else {
    if (passwordValue !== password2Value) {
      let html = `passwords do not match`;

      alerts.innerHTML = `
      <div class = "alert">
      ${html}
      </div>
      `;

      setTimeout(() => {
        alerts.innerHTML = "";
      }, 2000);
    } else {
      let user = {
        username: username.value,
        email: email.value,
        password: password.value,
      };
      return user;
    }
  }
};

registerBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const user = await checkRegisterInputs();
  try {
    const res = await fetch("http://localhost:5000/api/v1/users/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    if (data.status === "success") {
      alerts.innerHTML = `
      <div class = "alert">
      ${data.message}
      </div>
      `;

      setTimeout(() => {
        window.location.href =
          "http://127.0.0.1:5500/frontend/login/index.html";
      }, 2000);
    }
    if (data.status === "failed") {
      alerts.innerHTML = `
      <div class = "alert">
      ${data.message}
      </div>
      `;
      setTimeout(() => {
        alerts.innerHTML = "";
      }, 2000);
    }
  } catch (error) {
    alerts.innerHTML = `
    <div class = "alert">
    ${error.message}
    </div>
    `;
    console.log(error);
  }
});
