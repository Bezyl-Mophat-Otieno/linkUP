const socket = io("http://localhost:5000");

const user_id = JSON.parse(localStorage.getItem("user_id"));
const username = JSON.parse(localStorage.getItem("username,"));
const input = document.querySelector(".input");
const form = document.querySelector(".form");
const messageContainer = document.querySelector(".comm-container");
console.log(username);

const alertBox = document.getElementById("alertBox");
const alertMessage = document.getElementById("alertMessage");

// Function to show the alert box
const showAlert = (username, message) => {
  alertBox.style.display = "block";
  alertMessage.innerHTML = `${username} ${message}`;
};

// Function to hide the alert box
const hideAlert = () => {
  alertBox.style.display = "none";
};

// close the button on clicking anyware in the window
window.addEventListener("click", (e) => {
  hideAlert();
});

let socket_id = "";

socket.on("connect", () => {
  console.log("Client connected to server");
});

socket.emit("user-connected", { username, user_id });

socket.on("user-connected", (data) => {
  socket_id = data.socket_id;
  const username = data.username;

  showAlert(username, "Joined the chart");
});

socket.on("disconnect", () => {
  console.log("Client disconnected from server");
});

// User typing
input.addEventListener("input", () => {
  socket.emit("typing", { username, user_id });
});

socket.on("typing", (username) => {
  showAlert(username, "is typing...");
});

// sending of the message to the server

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = input.value;
  if (message === "") return;
  socket.emit("message", { message, username, user_id, socket_id });
  input.value = "";
});

socket.on("message", (data) => {
  const isMine = data.socket_id === socket_id;
  console.log(isMine);

  if (isMine) {
    let html = `
    
    <div class="sent">
    <div class="card card-custom" style="width: 18rem">
      <div class="card-body">
        <div class="card-header">
          <span class="material-symbols-outlined"> person </span>
          <a class="nav-link active" aria-current="page" href="#"
            >@John</a
          >
        </div>
        <p class="card-text">
          Some quick example text to build on the card title and make up
          the bulk of the card's content.
        </p>
        <div class="card-footer">
          <span class="material-symbols-outlined"> edit </span>
          <span class="material-symbols-outlined"> delete </span>
        </div>
      </div>
    </div>
  </div>

    `;
    messageContainer.innerHTML += html;
  } else {
    let html = `
    <div class="recieved">
            <div class="card card-custom" style="width: 18rem">
              <div class="card-body">
                <div class="card-header">
                  <span class="material-symbols-outlined"> person </span>
                  <a class="nav-link active" aria-current="page" href="#"
                    >@Mike</a
                  >
                </div>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <div class="card-footer">
                  <span class="material-symbols-outlined"> delete </span>
                </div>
              </div>
            </div>

    `;
    messageContainer.innerHTML += html;
  }
});
