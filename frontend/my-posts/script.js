window.onload = async () => {
  await fetchPosts();
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

const postsContainer = document.querySelector(".mainContent");
// Fetch Random Posts
const fetchPosts = async () => {
  try {
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
          <a class="nav-link active" aria-current="page" href="#">${
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
          <a class="nav-link active" aria-current="page" href=""http://127.0.0.1:5500/frontend/single-post/index.html?id=${
            post.post_id
          }">${await fetchPostCommentsCount(post.post_id)}</a>
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
  } // add the content as the last child of the main content div
  postsContainer.innerHTML = html;
};
