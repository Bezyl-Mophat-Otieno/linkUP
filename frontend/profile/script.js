const sales = document.querySelector("#sales");
const posts = document.querySelector("#posts");
const orders = document.querySelector("#orders");
const rightNav = document.querySelector(".rightNav");
const profileSection = document.querySelector(".profileSection");
const followers = document.querySelector(".followers");
const following = document.querySelector(".following");
const profileImage = document.querySelector("#imgInput");
const updateForm = document.querySelector(".updateForm");
let fetchedUser;
window.onload = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return (window.location.href = "/frontend/login/index.html");
  }
  await pageInitializer();
};

const pageInitializer = async () => {
  await fetchUser(localStorage.getItem("token"));
  await fetchFollowers();
  await fetchFollowing();
};

followers.addEventListener("click", () => {});

following.addEventListener("click", () => {});

const logoutBtn = document.querySelector("#logout");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "/frontend/login/index.html";
});

const alertBox = document.getElementById("alertBox");
const alertMessage = document.getElementById("alertMessage");

// Function to show the alert box
const showAlert = (message) => {
  alertBox.style.display = "block";
  alertMessage.innerHTML = `${message}`;
};

// Function to hide the alert box
const hideAlert = () => {
  alertBox.style.display = "none";
};

// close the button on clicking anyware in the window
window.addEventListener("click", (e) => {
  hideAlert();
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


    <img class='profile-pic' src=${user.profile} alt="" srcset="">
    <h5 class="username">@${user.username}</h5>
    <h5 class="bio">${user.bio}</h5>

    `;
    fetchedUser = user;
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
    showAlert(error.message);
    console.log(error);
    // Handle error appropriately
  }
};

// Uploading the image to cloudinary
profileImage.addEventListener("change", async (event) => {
  let imgUpload = event.target.files[0];
  if (imgUpload !== "") {
    showAlert("Uploading Image, Please wait a moment");
    // upload the image to cloudinary
    imgUrl = await uploadMedia(imgUpload, "image");
    showAlert("Image Uploaded Successfully");

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
      console.log(data);
      profileSection.innerHTML = ``;
      const updatedUser = data.data;
      profileSection.innerHTML = ` 
      <img src=${updatedUser.profile} alt="" srcset="">
      <h5 class="username">@${updatedUser.username}</h5>
      <h5 class="bio">${updatedUser.bio}</h5>
      `;

      showAlert("Profile Updated Successfully");
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
    return showAlert("Please fill in the fields you want to update");
  }

  try {
    const user_id = JSON.parse(localStorage.getItem("user_id"));
    console.log(JSON.stringify(updateData));
    const url = `http://localhost:5000/api/v1/users/update/${user_id}`;
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(updateData),
    });

    const data = await res.json();
    const updatedUser = data.data;

    profileSection.innerHTML = `
      <img src=${updatedUser.profile} alt="" srcset="">
      <h5 class="username">@${updatedUser.username}</h5>
      <h5 class="bio">${updatedUser.bio}</h5>
  
      `;
  } catch (error) {}
};

updateForm.addEventListener("submit", updateUser);

window.onload = async () => {
  localStorage.getItem("token")
    ? null
    : (window.location.href = "/frontend/login/index.html");
  await pageInitializer();
};
const followersCount = document.querySelector(".followers .count");
const followingCount = document.querySelector(".following .count");
console.log(followers);

// These are the people that follow me

const fetchFollowers = async () => {
  const user_id = JSON.parse(localStorage.getItem("user_id"));

  const res = await fetch(
    `http://localhost:5000/api/v1/followers/following/${user_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  const users = data.followers;

  followersCount.innerHTML = users === undefined ? 0 : users.length;
};
// This are the people I am following
const fetchFollowing = async () => {
  const user_id = JSON.parse(localStorage.getItem("user_id"));

  const res = await fetch(
    `http://localhost:5000/api/v1/followers/followed/${user_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  const users = data.followers;
  followingCount.innerHTML = users === undefined ? 0 : users.length;
};

following.addEventListener("click", async (e) => {
  if (e.target.classList.contains("btn")) {
    const id = e.target.getAttribute("id");
    await unfollow(id);
    showAlert("You have unfollowed this user");
  }
});
