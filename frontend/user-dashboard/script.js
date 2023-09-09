window.onload = async () => {
  localStorage.getItem("token")
    ? null
    : (window.location.href = "/frontend/login/index.html");
  await fetchPosts();
  await fetchUser(localStorage.getItem("token"));
};

const postsContainer = document.querySelector(".posts");
const logoutBtn = document.querySelector("#logout");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "/frontend/login/index.html";
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
    localStorage.setItem("user_id", JSON.stringify(user.id));
    return user;
  } catch (error) {
    console.log(error);
  }
};

// Fetch Posts
const fetchPosts = async () => {
  const res = await fetch("http://localhost:5000/api/v1/posts/fetch", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  let html = "";
  const posts = data.posts;

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
      href="http://127.0.0.1:5500/frontend/single-post/index.html?id=${post.post_id}"
    >
      <img
        class="card-img-top img-custom"
        src="https://images.pexels.com/photos/14244864/pexels-photo-14244864.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        alt="Card image cap"
      />
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
        const user = await fetchUser(localStorage.getItem("token"));
        const user_id = user.id;
        const post_id = commentForm.getAttribute("postId");
        await commentPost(comment, user_id, post_id);
      }
    });
  }
});
