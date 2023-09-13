window.onload = async () => {
  localStorage.getItem("token")
    ? null
    : (window.location.href = "/frontend/login/index.html");
  await pageInitializer();
};

// Page initializer

const pageInitializer = async () => {
  // await fetchPosts();
  await explorePosts();
  await fetchUser(localStorage.getItem("token"));
  await fetchNotFollowedUsers();
};
const postsContainer = document.querySelector(".posts");
const logoutBtn = document.querySelector("#logout");
const followers = document.querySelector(".container");
const postImage = document.querySelector("#imgInput");
const postVideo = document.querySelector("#videoInput");
const postForm = document.querySelector(".postForm");
const videoUploadContainer = document.querySelector(".video-upload");
const postBtn = document.querySelector(".postBtn");
const imgUploadContainer = document.querySelector(".img-upload");
const postInput = document.querySelector(".postInput");

let imgUrl = "";
let videoUrl = "";

let imgUpload = "";
let videoUpload = "";

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "/frontend/login/index.html";
});

// Fetching Not Followed Users

const fetchNotFollowedUsers = async () => {
  const user_id = JSON.parse(localStorage.getItem("user_id"));
  const url = `http://localhost:5000/api/v1/followers/notFollowed/${user_id}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Follow a user

  const followUser = async (followed) => {
    const myId = JSON.parse(localStorage.getItem("user_id"));
    const data = {
      follower: myId,
      followed: followed,
    };
    const res = await fetch("http://localhost:5000/api/v1/followers/follow", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        accetp: "application/json",
      },
    });

    const response = await res.json();

    console.log(response);
    alert(response.message);
  };

  followers.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn")) {
      const followed = e.target.getAttribute("id");
      followUser(followed);
      await fetchNotFollowedUsers();
    }
  });

  const data = await res.json();
  const users = data.followers;
  let html = "";
  users.forEach((user) => {
    console.log(user);
    html += `
      <div class="persons">
            <span class="material-symbols-outlined"> person </span>
            <a class="nav-link active" aria-current="page" href="#">@${user.username}</a>
            <div class="btn btn-outline-primary rounded-pill" onclick="followUser(${user.id})" id=${user.id}>Follow</div>
          </div>
    `;
  });
  followers.innerHTML = html;
};

// Fetch Logged in User
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
    localStorage.setItem("user_id", JSON.stringify(user.id));
    return user;
  } catch (error) {
    console.log(error);
  }
};

// A function to Upload a media file to cloudinary

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
postImage.addEventListener("change", async (event) => {
  imgUpload = event.target.files[0];
  if (imgUpload !== "") {
    // disable the video upload container
    videoUploadContainer.classList.add("disabled");
    // disable the postBtn by adding a class disabled
    postBtn.classList.add("disabled");
    alert("Uploading Image, Please wait a moment");
    // upload the image to cloudinary
    imgUrl = await uploadMedia(imgUpload, "image");
    alert("Image Uploaded Successfully");
    // enable the postBtn by removing the class disabled
    postBtn.classList.remove("disabled");
  }

  if (imgUpload !== "" && videoUpload !== "") {
    alert("You can only upload an image or a video");
  }
});

// Uploading the Video to cloudinary
postVideo.addEventListener("change", async (event) => {
  videoUpload = event.target.files[0];

  if (videoUpload !== "") {
    // disable the image upload container
    imgUploadContainer.classList.add("disabled");
    // disable the postBtn by adding a class disabled
    alert("Uploading Image, Please wait a moment");
    postBtn.classList.add("disabled");
    // upload the image to cloudinary
    videoUrl = await uploadMedia(videoUpload, "video");
    alert("Video Uploaded Successfully");
    // enable the postBtn by removing the class disabled
    postBtn.classList.remove("disabled");
  }
});

postForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userId = JSON.parse(localStorage.getItem("user_id"));

  const content = {
    content: postInput.value,
    image: imgUrl,
    video: videoUrl,
  };

  try {
    if (content.content.trim() !== "") {
      console.log(content);
      const url = `http://localhost:5000/api/v1/posts/add/${userId}`;
      console.log(url);
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(content),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      console.log(data);
      alert("Post Added Successfully");
    }
  } catch (error) {
    console.log(error);
  }
});

const renderPosts = (posts) => {
  let html = "";
  posts.forEach(async (post) => {
    console.log(post.video);
    html += `
    <div class="card card-custom" style="width: 18rem" postId=${post.post_id}>
    <div class="card-body">
      <div class="card-header">
        <span class="material-symbols-outlined"> person </span>
        <a class="nav-link active" aria-current="page" href="#">
          @${post.username}</a
        >
      </div>
      <p class="card-text"  >
      <a class="content-link" href="http://127.0.0.1:5500/frontend/single-post/index.html?id=${
        post.post_id
      }">
      ${post.content}

      </a>
      </p>
    </div>
    <a
      class="post"
      href="http://127.0.0.1:5500/frontend/single-post/index.html?id=${
        post.post_id
      }"
    >
    ${
      post.video
        ? `<video controls src=${post.video} autoplay class="card-img-top img-custom"></video>`
        : `
        ${
          post.image
            ? `
        <img
        class="card-img-top img-custom"
        src= ${post.image}
        alt="Card image cap"
      />
        `
            : ""
        }
        `
    }
   
    </a>
    <div class="card-footer">
      <div class="actions">
        <span class="material-symbols-outlined"> favorite </span>
        <a class="nav-link active" aria-current="page" href="#">300</a>
      </div>
      <div class="actions">
        <!-- Button trigger modal -->
        <span
      
          class="material-symbols-outlined modal-trigger"
        >
          comment
        </span>
        <a class="nav-link active" aria-current="page" href="#">200</a>
      </div>
      <div class="actions">
        <span class="material-symbols-outlined"> share </span>
        <a class="nav-link active" aria-current="page" href="#"></a>
      </div>
    </div>
  </div>

  <form class="d-flex justify-content-center commentForm" role="search">
    <input
      class="form-control ms-2 commentInput"
      type="text"
      placeholder="Write your comment"
      aria-label="Search"
    />

    <button class="btn postBtn" type="submit">
      <span class="material-symbols-outlined send" id=${
        post.post_id
      } > send </span>
    </button>
  </form>

    `;
  });
  // add the content as the last child of the main content div
  postsContainer.innerHTML = html;
};

// Explore Random Posts
const explorePosts = async () => {
  const res = await fetch("http://localhost:5000/api/v1/posts/fetch", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  let html = "";
  const posts = data.posts;

  return renderPosts(posts);
};

const commentPost = async (content, user_id, post_id) => {
  try {
    const res = await fetch("http://localhost:5000/api/v1/comments/add", {
      method: "POST",
      body: JSON.stringify({ content, user_id, post_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    alert(data.message);
  } catch (error) {
    alert(error);
  }
};
// Create a comment for each post
postsContainer.addEventListener("click", async (e) => {
  if (e.target.classList.contains("send")) {
    e.preventDefault();
    const post_id = e.target.getAttribute("id");
    console.log(post_id);
    const commentInput =
      e.target.parentElement.parentElement.querySelector(".commentInput");
    console.log(commentInput);
    const content = commentInput.value;
    const user_id = JSON.parse(localStorage.getItem("user_id"));

    // make sure the input has something before you comment
    if (content.trim() === "") {
      return alert("Please write something before you comment");
    }

    await commentPost(content, user_id, post_id);
    alert("Comment Added Successfully");
  }
});
