const login = document.querySelector(".btn-primary");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const alerts = document.querySelector(".alertContainer");

const checkLoginInputs = async () => {
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  if (emailValue.length == 0 || passwordValue.length == 0) {
    alerts.innerHTML = `
    
    <div class="alert" >
    Please fill in all fields
    </div>

    `;

    setTimeout(() => {
      alerts.innerHTML = "";
    }, 2000);
  } else {
    let user = {
      email: email.value,
      password: password.value,
    };
    return user;
  }
};

login.addEventListener("click", async (e) => {
  e.preventDefault();
  const reqBody = await checkLoginInputs();

  try {
    const res = await fetch("http://localhost:5000/api/v1/users/login", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);

    if (data.status === "success") {
      alerts.innerHTML = `
    
      <div class="alert" >
     ${data.message}
      </div>
      `;

      setTimeout(() => {
        alerts.innerHTML = "";
        window.location.href = "/frontend/user-dashboard/index.html";
      }, 3000);
      localStorage.setItem("token", data.token);
    } else {
      alerts.innerHTML = `
    
      <div class="alert" >
     ${data.message}
      </div>
      `;

      setTimeout(() => {
        alerts.innerHTML = "";
      }, 3000);
    }
  } catch (error) {
    console.log(error);
  }
});
