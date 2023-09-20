window.onload = async () => {
  localStorage.getItem("token")
    ? null
    : (window.location.href = "/frontend/login/index.html");
  await pageInitializer();
};
const followers = document.querySelector(".follower-container");
const following = document.querySelector(".following-container");
console.log(followers);

const pageInitializer = async () => {
  await fetchFollowers();
  await fetchFollowing();
};

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

  let html = "";

  users.forEach((follower) => {
    html += `
    <tr>
    <td>${follower.username}</td>
    </tr>
    `;
  });
  followers.innerHTML = html;
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
  console.log(users);
  let html = "";
  users.forEach((followedUser) => {
    html += `
    <tr>
    <td>${followedUser.username}</td>
    <td>
      <button class="btn btn-primary" id=${followedUser.followTableId} >Unfollow</button>
    </td>
    </tr>
    `;
  });

  following.innerHTML = html;
};

// unfollow a user

const unfollow = async (id) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/v1/followers/unfollow/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    console.log(data);
    await fetchFollowers();
    await fetchFollowing();
  } catch (error) {
    console.log(error);
  }
};

following.addEventListener("click", async (e) => {
  if (e.target.classList.contains("btn")) {
    const id = e.target.getAttribute("id");
    await unfollow(id);
    showAlert("You have unfollowed this user");
  }
});
