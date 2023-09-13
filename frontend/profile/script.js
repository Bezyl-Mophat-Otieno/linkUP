const sales = document.querySelector("#sales");
const posts = document.querySelector("#posts");
const orders = document.querySelector("#orders");
const rightNav = document.querySelector(".rightNav");
const profileSection = document.querySelector(".profileSection");
const followers = document.querySelector(".followers");
const following = document.querySelector(".following");
const profileImage = document.querySelector("#imgInput");
const updateForm = document.querySelector(".updateForm");
window.onload = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return (window.location.href = "/frontend/login/index.html");
  }
  await pageInitializer();
};

const pageInitializer = async () => {
  await fetchUser(localStorage.getItem("token"));
};

followers.addEventListener("click", () => {});

following.addEventListener("click", () => {});

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

// Fetch Following

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
    console.log(user);
    profileSection.innerHTML = `


    <img src=${user.profile} alt="" srcset="">
    <h5 class="username">@${user.username}</h5>
    <h5 class="bio">${user.bio}</h5>

    `;
  } catch (error) {
    console.log(error);
  }
};

const uploadMedia = async (file, type) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "shopie");
    formData.append("cloud_name", "dfukupatj");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dfukupatj/${type}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    console.log(data);
    return await data.url;
  } catch (error) {
    alert(error);
    console.log(error);
    // Handle error appropriately
  }
};

// Uploading the image to cloudinary
profileImage.addEventListener("change", async (event) => {
  let imgUpload = event.target.files[0];
  if (imgUpload !== "") {
    alert("Uploading Image, Please wait a moment");
    // upload the image to cloudinary
    imgUrl = await uploadMedia(imgUpload, "image");
    alert("Image Uploaded Successfully");

    const imgData = {
      profile: imgUrl,
    };

    console.log(imgData);

    try {
      const user_id = JSON.parse(localStorage.getItem("user_id"));
      const url = `http://localhost:5000/api/v1/users/update/${user_id}`;
      console.log(url);
      const res = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(imgData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      await pageInitializer();
      alert("Profile Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  }
});

const updateUser = async (event) => {
  event.preventDefault();
  const username = document.querySelector("#username").value;
  const bio = document.querySelector("#bio").value;
  const email = document.querySelector(".email").value;
  console.log(username, bio, email);

  const updateData = {
    username: username === "" ? null : username,
    bio: bio === "" ? null : bio,
    email: email === "" ? null : email,
  };
  console.log(updateData);
  if (username === null && bio === null && email === null) {
    return alert("Please fill in the fields you want to update");
  }

  try {
    const user_id = JSON.parse(localStorage.getItem("user_id"));
    const res = await fetch(
      `http://localhost:5000/api/v1/users/update/${user_id}`,
      {
        method: "PUT",
        body: JSON.stringify(updateData),
      }
    );

    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

updateForm.addEventListener("submit", updateUser);
