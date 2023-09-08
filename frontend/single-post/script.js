window.onload = async () => {
  localStorage.getItem("token")
    ? null
    : (window.location.href = "/frontend/login/index.html");
  const postId = window.location.search.split("=")[1];
  await fetchPost(postId);
  await fetchPostComments(postId);
};
const logoutBtn = document.querySelector("#logoutBtn");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "/frontend/login/index.html";
});

const postContainer = document.querySelector(".post");
const commentContainer = document.querySelector(".comments");

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
        </div>
        <img
          class="card-img-top img-custom"
          src="https://images.pexels.com/photos/14244864/pexels-photo-14244864.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt="Card image cap"
        />

        
        <div class="card-footer">
          <div class="actions">
            <span class=" material-symbols-outlined" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasComments" aria-controls="offcanvasRight"
            > favorite</span>
            <a class="nav-link active" aria-current="page" href="#">300</a>
          </div>
          <div class="actions">
            <!-- Button trigger modal -->
            <span
            class=" material-symbols-outlined" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasComments" aria-controls="offcanvasRight"
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
        `;
    }
    postContainer.innerHTML = html;
  } catch (error) {
    alert(error);
  }
};

const fetchPostComments = async (postId) => {
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
      commentContainer.innerHTML = html;
    }
  } catch (error) {
    alert(error);
  }
};
