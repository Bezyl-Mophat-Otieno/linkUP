const searchForm = document.querySelector(".form");
const searchInput = document.querySelector(".searchInput");

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
let displayedPosts = [];
let suggested = [];
const pageInitializer = async () => {
  localStorage.getItem("token")
    ? null
    : (window.location.href = "/frontend/login/index.html");
  await fetchUser(localStorage.getItem("token"));
  await fetchNotFollowedUsers();
  await fetchPosts();
};
window.onload = async () => {
  // initializing the contents of the Page
  await pageInitializer();
};

// serch through the followers and the followers
searchInput.addEventListener("input", (e) => {
  e.preventDefault();
  const search = searchInput.value;
  const filteredsers = suggested.filter((user) => {
    return user.username.includes(search);
  });
  displaySuggestedUsers(filteredsers);

  const filteredPosts = displayedPosts.filter((post) => {
    return post.content.includes(search);
  });
  renderPosts(filteredPosts);
});

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
  displayedPosts = posts;

  return renderPosts(posts);
};

const explore = document.querySelector(".explore-menu");
explore.addEventListener("click", async () => {
  postsContainer.innerHTML = "";
  // Fetching the posts
  await explorePosts();
});

const explore1 = document.querySelector(".explore-nav");
explore1.addEventListener("click", async () => {
  postsContainer.innerHTML = "";
  // Fetching the posts
  await explorePosts();
});

const home = document.querySelector(".home-menu");
home.addEventListener("click", async () => {
  postsContainer.innerHTML = "";
  // Fetching the posts
  await fetchPosts();
});

const home1 = document.querySelector(".home-nav");
home1.addEventListener("click", async () => {
  postsContainer.innerHTML = "";
  // Fetching the posts
  await fetchPosts();
});

const myPostsBtn = document.querySelector(".posts-menu");
const myPostsBtn1 = document.querySelector(".posts-nav");

// My  Posts
const myPosts = async () => {
  const user_id = JSON.parse(localStorage.getItem("user_id"));
  const res = await fetch(
    `http://localhost:5000/api/v1/posts/myPost/${user_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();
  let html = "";
  const posts = data.posts;
  displayedPosts = posts;

  return renderMyPosts(posts);
};

const renderMyPosts = async (posts) => {
  if (posts.length == 0) {
    postsContainer.innerHTML = "<h1>No Posts Yet</h1>";
  }
  let html = "";
  for (const post of posts) {
    html += `
    <div class="card card-custom" style="width: 18rem" postId=${post.post_id}>
    <div class="card-body">
      <div class="card-header">
        <span class="material-symbols-outlined"> person </span>
        <a class="nav-link active" aria-current="page" href="http://127.0.0.1:5500/frontend/single-post/index.html?id=${
          post.post_id
        }">
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
        ? `<video controls src=${post.video} class="card-img-top video"></video>`
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
    
    
    <div class="card-footer">
      <div class="actions">
        <span class="material-symbols-outlined edit" id=${
          post.post_id
        } > edit </span>
        <a class="nav-link active" aria-current="page" href="#" id=${
          post.post_id
        }>EDIT</a>
      </div>
      <div class="actions">
        <span class="material-symbols-outlined delete" id=${post.post_id}>
          delete
        </span>
        <a class="nav-link active" aria-current="page" href= "#">DELETE</a>
      </div>
  </div>



    `;
  } // add the content as the last child of the main content div
  postsContainer.innerHTML = html;
};

myPostsBtn.addEventListener("click", async () => {
  postsContainer.innerHTML = "";
  // Fetching the posts
  await myPosts();
});

myPostsBtn1.addEventListener("click", async () => {
  postsContainer.innerHTML = "";
  // Fetching the posts
  await myPosts();
});

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
    localStorage.setItem(`${user.username}`, JSON.stringify(user.username));
    localStorage.setItem("username,", JSON.stringify(user.username));
    localStorage.setItem("user_id", JSON.stringify(user.id));
    return user;
  } catch (error) {
    console.log(error);
  }
};

const postsContainer = document.querySelector(".posts");
const logoutBtn = document.querySelector("#logout");
const postInput = document.querySelector(".postInput");
const postForm = document.querySelector(".postForm");
const followers = document.querySelector(".container");
const postImage = document.querySelector("#imgInput");
const postVideo = document.querySelector("#videoInput");
const postBtn = document.querySelector(".postBtn");
const imgUploadContainer = document.querySelector(".img-upload");
const videUploadContainer = document.querySelector(".video-upload");
let imgUrl = "";
let videoUrl = "";

let imgUpload = "";
let videoUpload = "";

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "/frontend/login/index.html";
});

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
    showAlert(error.message);
    console.log(error);
    // Handle error appropriately
  }
};

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
  showAlert(response.message);
};

followers.addEventListener("click", async (e) => {
  if (e.target.classList.contains("toFollow")) {
    const followed = e.target.getAttribute("id");
    followUser(followed);
    await fetchNotFollowedUsers();
  }
});

// Uploading the image to cloudinary
postImage.addEventListener("change", async (event) => {
  imgUpload = event.target.files[0];
  if (imgUpload !== "") {
    // disable the video upload container
    videUploadContainer.classList.add("disabled");
    // disable the postBtn by adding a class disabled
    postBtn.classList.add("disabled");
    showAlert("Uploading Image, Please wait a moment");
    // upload the image to cloudinary
    imgUrl = await uploadMedia(imgUpload, "image");
    showAlert("Image Uploaded Successfully");
    // enable the postBtn by removing the class disabled
    postBtn.classList.remove("disabled");
  }

  if (imgUpload !== "" && videoUpload !== "") {
    showAlert("You can only upload an image or a video");
  }
});

// Uploading the Video to cloudinary
postVideo.addEventListener("change", async (event) => {
  videoUpload = event.target.files[0];

  if (videoUpload !== "") {
    // disable the image upload container
    imgUploadContainer.classList.add("disabled");
    // disable the postBtn by adding a class disabled
    showAlert("Uploading Video, Please wait a moment");
    postBtn.classList.add("disabled");
    // upload the image to cloudinary
    videoUrl = await uploadMedia(videoUpload, "video");
    showAlert("Video Uploaded Successfully");
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
      // clear the input fields
      postInput.value = "";
      showAlert("Post Added Successfully");
    }

    if (e.target.classList.contains("edit")) {
      const content = {
        content: postInput.value,
        image: imgUrl,
        video: videoUrl,
      };

      await editPost(postId, content);
      await myPosts();
    }
  } catch (error) {
    console.log(error);
  }
});

const renderPosts = async (posts) => {
  if (posts.length == 0) {
    postsContainer.innerHTML = "<h1>No Posts Yet</h1>";
  }
  let html = "";
  for (const post of posts) {
    html += `
    <div class="card card-custom" style="width: 18rem" postId=${post.post_id}>
    <div class="card-body">
      <div class="card-header">
        <span class="material-symbols-outlined"> person </span>
        <a class="nav-link active" aria-current="page" href="http://127.0.0.1:5500/frontend/single-post/index.html?id=${
          post.post_id
        }">
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
        ? `<video controls src=${post.video} class="card-img-top video"></video>`
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
        <span class="material-symbols-outlined like" id=${
          post.post_id
        }> favorite </span>
        <a class="nav-link active likeCount" aria-current="page" href="#">${
          post.likes
        }</a>
      </div>
      <div class="actions">
        <!-- Button trigger modal -->
        <a href="http://127.0.0.1:5500/frontend/single-post/index.html?id=${
          post.post_id
        }"
      
          class="material-symbols-outlined modal-trigger"
        >
          comment
        </a>
        <a class="nav-link active count" aria-current="page" href=""http://127.0.0.1:5500/frontend/single-post/index.html?id=${
          post.post_id
        }">${await fetchPostCommentsCount(post.post_id)}</a>
      </div>

  </div>

  <form class="d-flex justify-content-center commentForm" role="search">
    <input
      class="form-control ms-2 commentInput"
      type="text"
      placeholder="Write your comment"
      aria-label="Search"
    />

    <button class="btn commentBtn" type="submit">
      <span class="material-symbols-outlined send" id=${
        post.post_id
      } > send </span>
    </button>
  </form>

    `;
  } // add the content as the last child of the main content div
  postsContainer.innerHTML = html;
};

const fetchPostCommentsCount = async (postId) => {
  try {
    console.log(postId);
    const res = await fetch(
      `http://localhost:5000/api/v1/comments/post/${postId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    return (count =
      data?.comments?.length == undefined ? 0 : data.comments.length);
  } catch (error) {
    showAlert(error.message);
  }
};

// Fetch Random Posts
const fetchPosts = async () => {
  try {
    const user_id = JSON.parse(localStorage.getItem("user_id"));
    const res = await fetch(
      `http://localhost:5000/api/v1/posts/fetch/followed/${user_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    let posts;
    let html = "";
    if (data.message === "No posts found") {
      posts = [];
      return renderPosts(posts);
    }

    posts = data.posts;
    displayedPosts = posts;
    return renderPosts(posts);
  } catch (error) {
    console.log(error);
  }
};

const fetchNotFollowedUsers = async () => {
  const user_id = JSON.parse(localStorage.getItem("user_id"));
  const url = `http://localhost:5000/api/v1/followers/notFollowed/${user_id}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (data.message !== "Could not retrieve followers") {
    const users = data.followers;
    suggested = users;
    return displaySuggestedUsers(users);
  }
};

const displaySuggestedUsers = (users) => {
  if (users.length == 0) {
    followers.innerHTML = "<h1>No Users Found</h1>";
  }
  let html = "";

  users.forEach((user) => {
    html += `
    <div class="persons">
          <span class="material-symbols-outlined"> person </span>
          <a class="nav-link active" aria-current="page" href="#"
            >@${user.username}</a
          >
          <div class="btn btn-outline-primary toFollow rounded-pill" id=${user.id}>Follow</div>
        </div>
  `;
  });
  followers.innerHTML = html;
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
    window.location.reload();
    showAlert(data.message);
  } catch (error) {
    showAlert(error.message);
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
      return showAlert("Please write something before you comment");
    }

    await commentPost(content, user_id, post_id);
    showAlert("Comment Added Successfully");
  }

  if (e.target.classList.contains("like")) {
    const post_id = e.target.getAttribute("id");
    // add the class clicked on the icon
    e.target.classList.add("clicked");
    likePost(post_id);
  }
  if (e.target.classList.contains("delete")) {
    const postId = e.target.getAttribute("id");
    await deletePost(postId);
  }
  if (e.target.classList.contains("edit")) {
    e.preventDefault();
    const postId = e.target.getAttribute("id");
    const post = await fetchPost(postId);
    // prefil the input and image input with the initial posts data first
    postInput.value = post.content;
    postImage.src = post.image;
    postVideo.src = post.video;
    // add edit class to the postForm
    postForm.classList.add("edit");
  }
});

const editPost = async (postId, content) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/v1/posts/update/${postId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      }
    );
    const data = await res.json();
    console.log(data);
    showAlert("Post Updated successfully");
    // clear the inputs
    postInput.value = "";
  } catch (error) {
    showAlert(error.message);
  }
};

const deletePost = async (postId) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/v1/posts/delete/${postId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    showAlert(data.message);
    await myPosts();
  } catch (error) {
    showAlert(error.message);
  }
};

const fetchPost = async (postId) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/v1/posts/get/${postId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    const post = data.post;
    console.log(post);
    return post;
  } catch (error) {
    showAlert(error.message);
  }
};

// Like a post

const likePost = async (post_id) => {
  const user_id = JSON.parse(localStorage.getItem("user_id"));

  try {
    const res = await fetch(
      `http://localhost:5000/api/v1/posts/like/${post_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id }),
      }
    );

    const data = await res.json();
    // alert("Post Liked Successfully");
    await fetchPosts();
  } catch (error) {
    showAlert(error.message);
  }
};
