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

let postId = "";
// close the button on clicking anyware in the window
window.addEventListener("click", (e) => {
  hideAlert();
});
window.onload = async () => {
  localStorage.getItem("token")
    ? null
    : (window.location.href = "/frontend/login/index.html");
  postId = window.location.search.split("=")[1];
  await fetchPost(postId);
  let comments = await fetchPostComments(postId);
  comments = comments === undefined ? [] : comments;
  renderCanvas(comments, "comment");
  let likers = await fetchPostLikers(postId);
  likers = likers === undefined ? [] : likers;
  renderCanvas(likers, "like");
};
const logoutBtn = document.querySelector("#logout");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "/frontend/login/index.html";
});

const postContainer = document.querySelector(".post");
const commentContainer = document.querySelector(".comments");
const likesContainer = document.querySelector(".likes");

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
    let html = "";
    if (data.status == "success") {
      const post = data.post;
      console.log(post);
      html += `
        <div class="card card-custom" style="width: 18rem">
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
          <a
          class="post"
          href="http://127.0.0.1:5500/frontend/single-post/index.html?id=${
            post.post_id
          }"
        >
        ${
          post.video
            ? `<video controls src=${post.video} autoplay class="card-img-top video"></video>`
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
            <span class=" material-symbols-outlined" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLikers" aria-controls="offcanvasRight"
            > favorite</span>
            <a class="nav-link active" aria-current="page" href="#">${
              post.likes
            }</a>
          </div>
          <div class="actions">
            <!-- Button trigger modal -->
            <span
            class=" material-symbols-outlined commentBtn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasComments" aria-controls="offcanvasRight"
            >
              comment
            </span>
            <a class="nav-link active" aria-current="page" href="#">${await fetchCommentsCount(
              post.post_id
            )}</a>
          </div>

        </div>
      </div>
        `;
    }
    postContainer.innerHTML = html;
  } catch (error) {
    showAlert(error.message);
  }
};

const deleteComment = async (commentId) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/v1/comments/delete/${commentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    await fetchPostComments(postId);
    showAlert("Comment deleted successfully");
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  } catch (error) {
    console.log(error);
  }
};

const fetchPostLikers = async (postId) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/v1/posts/likers/${postId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    if (data.status == "success") {
      return data.likers;
    } else {
      showAlert("No likes found");
    }
  } catch (error) {
    showAlert(error.message);
  }
};

const fetchPostComments = async (postId) => {
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
    let html = "";
    if (data.status == "success") {
      const comments = data.comments;
      return comments;
    }

    showAlert("No comments Found");
  } catch (error) {
    showAlert(error.message);
  }
};

commentContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const commentId = e.target.getAttribute("commentId");
    deleteComment(commentId);
    fetchCommentsCount();
  }
});

const fetchCommentsCount = async (postId) => {
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

const renderCanvas = (list, type) => {
  const loggedInUserId = JSON.parse(localStorage.getItem("user_id"));
  let html = "";

  if (type == "comment") {
    list.forEach((comment) => {
      html += `
    <div class="comment" >
    <div class="card card-custom" style="width: 18rem">
      <div class="card-body">
        <div class="card-header">
          <span class="material-symbols-outlined"> person </span>
          <a class="nav-link active" aria-current="page" href=http://127.0.0.1:5500/frontend/single-comment/index.html?id=${
            comment.comment_id
          }
            >@${comment.username}</a
          >
        </div>
        <p class="card-text">
          ${comment.content}
        </p>
        <div class="card-footer">
          <span class="material-symbols-outlined like" id=${
            comment.comment_id
          }> favorite </span>
          <a class="nav-link active" aria-current="page" href="#">${
            comment.likes
          }</a>
          ${
            loggedInUserId == comment.user_id
              ? `<span class="material-symbols-outlined delete" commentId=${comment.comment_id} > delete </span>`
              : ``
          }
    
        </div>
      </div>
    </div>
    </div> 
    `;
    });
    commentContainer.innerHTML = html;
  } else {
    list.forEach((like) => {
      console.log(like);
      html += `
    <div class="comment" >
    <div class="card card-custom" style="width: 18rem">
      <div class="card-body">
        <div class="card-header">
          <span class="material-symbols-outlined"> person </span>
          <a class="nav-link active " aria-current="page" href=http://127.0.0.1:5500/frontend/single-comment/index.html?id=${like.id}
            >@${like.username}</a
          >
        </div>
      </div>
    </div>
    </div> 
    `;
    });
    likesContainer.innerHTML = html;
  }
};

// Like a Comment

const likeComment = async (comment_id) => {
  const user_id = JSON.parse(localStorage.getItem("user_id"));

  try {
    const res = await fetch(
      `http://localhost:5000/api/v1/comments/like/${comment_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id }),
      }
    );

    const data = await res.json();
    console.log(data);
    showAlert("Comment Liked Successfully");
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  } catch (error) {
    showAlert(error.message);
  }
};

commentContainer.addEventListener("click", async (e) => {
  if (e.target.classList.contains("like")) {
    const comment_id = e.target.getAttribute("id");
    likeComment(comment_id);
    // window.location.reload
  }
});
