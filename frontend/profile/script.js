const sales = document.querySelector("#sales");
const posts = document.querySelector("#posts");
const orders = document.querySelector("#orders");
const rightNav = document.querySelector(".rightNav");
const followersBtn = document.querySelector(".followersBtn");
const profileSection = document.querySelector(".profileSection");
const followers = document.querySelector(".followers");
const following = document.querySelector(".following");
const profileImage = document.querySelector("#imgInput");
window.onload = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return (window.location.href = "/frontend/login/index.html");
  }
  fetchUser(token);
  await fetchFollowers();
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
    console.log(data);
    profileSection.innerHTML = `

    <img src=${user.profile} alt="" srcset="">
    <h5 class="username">@${user.username}</h5>
    <h5 class="bio">Exploring the world one step at a time 🌍 | Nature lover 🌿 | Adventure seeker 🏞️ | Food enthusiast 🍔 | Bookworm 📚 | Music addict 🎵 | Dreamer ✨ | Life is a beautiful journey, and I'm here to share it with you! 🌟.</h5>

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
      const user_id = JSON.pa(localStorage.getItem("user_id"));
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

      console.log(data);
      alert("Profile Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  }
});
