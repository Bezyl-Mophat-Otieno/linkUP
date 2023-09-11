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

window.onload = async () => {
  localStorage.getItem("token")
    ? null
    : (window.location.href = "/frontend/login/index.html");
  await fetchUser(localStorage.getItem("token"));
  await fetchNotFollowedUsers();
  await fetchPosts();
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
    videUploadContainer.classList.add("disabled");
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
    html += `
    <div class="card card-custom" style="width: 18rem" postId=${post.post_id}>
    <div class="card-body">
      <div class="card-header">
        <span class="material-symbols-outlined"> person </span>
        <a class="nav-link active" aria-current="page" href="#">
          @${post.username}</a
        >
      </div>
      <p class="card-text">
        ${post.content}
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
        ? ` <video controls src=${post.video} class="card-img-top video-custom"></video>`
        : `
        <img
        class="card-img-top img-custom"
        src= ${
          post.image
            ? post.image
            : "https://images.pexels.com/photos/14244864/pexels-photo-14244864.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        }
        alt="Card image cap"
      />   
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
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
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

  <!-- Comments Modal -->

  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body modal-custom">
          <form action="" class="updateForm" postId=${post.post_id}>
            <textarea
              name=""
              placeholder="Share your thoughts"
              id=""
              cols="30"
              rows="5"
              class="form-control"
            ></textarea>

            <button type="submit" class="btn btn-secondary">
              Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
    `;
  });
  // add the content as the last child of the main content div
  postsContainer.innerHTML = html;
};

// Fetch Random Posts
const fetchPosts = async () => {
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
  let html = "";
  const posts = data.posts;
  return renderPosts(posts);
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
  const users = data.followers;
  let html = "";
  users.forEach((user) => {
    html += `
      <div class="persons">
            <span class="material-symbols-outlined"> person </span>
            <a class="nav-link active" aria-current="page" href="#"
              >@${user.username}</a
            >
            <div class="btn btn-outline-primary rounded-pill">Follow</div>
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
    alert(data.message);
  } catch (error) {
    alert(error);
  }
};

// Create a comment for each post
postsContainer.addEventListener("click", async (e) => {
  if (e.target.classList.contains("modal-trigger")) {
    const commentForm = document.querySelector(".updateForm");
    commentForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const comment = commentForm.querySelector("textarea").value;
      if (comment.trim() == "") {
        alert("Comment cannot be empty");
      } else {
        const user_id = JSON.parse(localStorage.getItem("user_id"));
        const post_id = commentForm.getAttribute("postId");
        await commentPost(comment, user_id, post_id);
      }
    });
  }
});
