window.onload = async () => {
  localStorage.getItem("token")
    ? null
    : (window.location.href = "/frontend/login/index.html");
  const commentId = window.location.search.split("=")[1];
  console.log(commentId);
  await fetchSubComment(commentId);
  await fetchComment(commentId);
};
let subCommentStatus = false;
const logoutBtn = document.querySelector("#logout");

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

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "/frontend/login/index.html";
});

const commentContainer = document.querySelector(".commentContainer");
const likesContainer = document.querySelector(".likes");
const subComment = document.querySelector(".subCommentContainer");

const fetchComment = async (commentId) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/v1/comments/comment/${commentId}`,
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
      const comment = data.comment;
      console.log(subCommentStatus);
      const isMine =
        comment.user_id == JSON.parse(localStorage.getItem("user_id"));
      html += `
      <div class="comment" }>
      <div class="card card-custom" style="width: 18rem">
        <div class="card-body">
          <div class="card-header">
            <span class="material-symbols-outlined"> person </span>
            <a class="nav-link active" aria-current="page" href="#"
              >@${comment.username}</a
            >
          </div>
          <p class="card-text">
            ${comment.content}
          </p>
          <div class="card-footer" commentId=${comment.comment_id}>
          
            ${
              subCommentStatus
                ? ``
                : `<span class="material-symbols-outlined subComment"> comment </span>`
            }
           
           
            <span class="material-symbols-outlined modal-trigger"
            data-bs-toggle="modal"
            data-bs-target="#likes"
            > favorite </span>      
          </div>
          </div>
          </div>

          <div class="hide" id="subcommentForm">

          <form class="d-flex justify-content-center  commentForm"   role="search">
          <input
            class="form-control ms-2 commentInput "
            type="text"
            placeholder="Write Your Subcomment here ..."
            aria-label="Search"
          />
      
          <button class="btn postBtn" type="submit">
            <span class="material-symbols-outlined   addSubComment" postId =${
              comment.post_id
            } id=${comment.comment_id} > send </span>
          </button>
        </form>

        </div>

          ${
            isMine
              ? `<form class="d-flex justify-content-center commentForm" role="search">
          <input
            class="form-control ms-2 commentInputEdit"
            type="text"
            placeholder="Edit Your Comment "
            aria-label="Search"
          />
      
          <button class="btn postBtn" type="submit">
            <span class="material-symbols-outlined send" id=${comment.comment_id} > send </span>
          </button>
        </form>`
              : ``
          }
      </div> 

      
 
      <!-- Comments Like -->


      <div
        class="modal fade"
        id="likes"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
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

            </div>
          </div>
        </div>
      </div>
      


      `;
    }
    commentContainer.innerHTML = html;
  } catch (error) {
    console.log(error);
  }
};

commentContainer.addEventListener("click", async (e) => {
  e.preventDefault();
  if (e.target.classList.contains("send")) {
    const commentInput = document.querySelector(".commentInputEdit");
    const comment_id = e.target.getAttribute("id");
    const content = commentInput.value;
    console.log(content);
    if (content == "") {
      showAlert("Please enter a comment");
      return;
    }
    await updateComment(comment_id, { content });
    await fetchComment(comment_id);
  }

  if (e.target.classList.contains("subComment")) {
    const subComment = document.querySelector("#subcommentForm");
    subComment.classList.remove("hide");
  }
  if (e.target.classList.contains("addSubComment")) {
    const comment_id = e.target.getAttribute("id");
    const post_id = e.target.getAttribute("postId");
    const content = document.querySelector(".commentInput").value;
    if (content == "") {
      showAlert("Please enter a comment");
      return;
    }
    await addSubComment(comment_id, post_id, content);
    // await fetchComment(comment_id);
    showAlert("Subcomment added successfully");
  }
});

const updateComment = async (commentId, content) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/v1/comments/update/${commentId}`,
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
    showAlert("comment Updated successfully");
  } catch (error) {
    showAlert(error.message);
  }
};

const fetchCommentLikers = async (postId) => {
  try {
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
      const loggedInUserId = JSON.parse(localStorage.getItem("user_id"));

      comments.forEach((comment) => {
        console.log(comment);
        console.log(loggedInUserId == comment.user_id);
        html += `
        <div class="comment">
        <div class="card card-custom" style="width: 18rem">
          <div class="card-body">
            <div class="card-header">
              <span class="material-symbols-outlined"> person </span>
              <a class="nav-link active" aria-current="page" href="#"
                >@${comment.username}</a
              >
            </div>
            <p class="card-text">
              ${comment.content}
            </p>
            <div class="card-footer">
              <span class="material-symbols-outlined"> favorite </span>
              ${
                loggedInUserId == comment.user_id
                  ? `<span class="material-symbols-outlined"> delete </span>`
                  : ``
              }
        
            </div>
          </div>
        </div>
        </div> 
        `;
      });
      likesContainer.innerHTML = html;
    }
  } catch (error) {
    showAlert(error.message);
  }
};

const fetchSubComment = async (comment_id) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/v1/comments/subcomment/${comment_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    if (data.status === "success") {
      subCommentStatus = true;
      const comment = data.comment;
      const loggedInUserId = JSON.parse(localStorage.getItem("user_id"));
      console.log(loggedInUserId == comment.user_id);
      subComment.innerHTML = `
      <div class="comment">
      <div class="card card-custom" style="width: 18rem">
        <div class="card-body">
          <div class="card-header">
            <span class="material-symbols-outlined"> person </span>
            <a class="nav-link active" aria-current="page" href="#"
              >@${comment.username}</a
            >
          </div>
          <p class="card-text">
            ${comment.content}
          </p>

        </div>
      </div>
      </div> 
      `;
    }
  } catch (error) {
    showAlert(error.message);
  }
};

const addSubComment = async (comment, post_id, content) => {
  const user_id = JSON.parse(localStorage.getItem("user_id"));
  const res = await fetch("http://localhost:5000/api/v1/comments/subcomment/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id, post_id, comment, content }),
  });
  const data = await res.json();
  window.location.reload();
};
