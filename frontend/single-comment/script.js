window.onload = async () => {
  localStorage.getItem("token")
    ? null
    : (window.location.href = "/frontend/login/index.html");
  const commentId = window.location.search.split("=")[1];
  console.log(commentId);
  await fetchComment(commentId);
  // await fetchPostComments(postId);
};
const logoutBtn = document.querySelector("#logout");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "/frontend/login/index.html";
});

const commentContainer = document.querySelector(".commentContainer");
const likesContainer = document.querySelector(".likes");

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
      console.log(comment);
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
            <span class="material-symbols-outlined modal-trigger edit" 
            data-bs-toggle="modal"
            data-bs-target="#editModal"> edit </span>

            ${
              comment.subComment
                ? ``
                : ` 
            <span class="material-symbols-outlined modal-trigger"
            data-bs-toggle="modal"
            data-bs-target="#commentModal"
            > comment </span>`
            }
           
            <span class="material-symbols-outlined modal-trigger"
            data-bs-toggle="modal"
            data-bs-target="#likes"
            > favorite </span>      
          </div>
          </div>
          </div>
          <form class="d-flex justify-content-center commentForm" role="search">
          <input
            class="form-control ms-2 commentInput"
            type="text"
            placeholder="Edit Your Comment "
            aria-label="Search"
          />
      
          <button class="btn postBtn" type="submit">
            <span class="material-symbols-outlined send" id=${
              comment.comment_id
            } > send </span>
          </button>
        </form>
      </div> 

      <!-- Comments Modal -->
      <div
        class="modal fade"
        id="commentModal"
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
              <form action="" class="updateForm" commentId=${
                comment.comment_id
              }>
                <textarea
                  name=""
                  placeholder="Share your thoughts"
                  id=""
                  cols="30"
                  rows="5"
                  class="form-control"
                ></textarea>
    
                <button type="submit" class="btn btn-secondary">
                  Add Subcomment
                </button>
              </form>
            </div>
          </div>
        </div>
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
  if (e.target.classList.contains("edit")) {
    const commentId = e.target.parentElement.getAttribute("commentId");
    console.log(commentId);
    const updateForm = document.querySelector(".updateForm");
    const textarea = document.querySelector("textarea");
    textarea.addEventListener("input", () => {
      console.log("Hello");
    });
  }
  if (e.target.classList.contains("send")) {
    const commentInput = document.querySelector(".commentInput");
    const comment_id = e.target.getAttribute("id");
    const content = commentInput.value;
    if (content == "") {
      alert("Please enter a comment");
      return;
    }
    await updateComment(comment_id, { content });
    await fetchComment(comment_id);
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
    alert("comment Updated successfully");
  } catch (error) {
    alert(error);
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
              <span class="material-symbols-outlined"> edit </span>
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
    alert(error);
  }
};
