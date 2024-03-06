const socket = io("ws://localhost:3500");

// Class Selectors
const activity = document.querySelector(".activity");
const userList = document.querySelector(".user-list");
const roomList = document.querySelector(".room-list");
const chatDisplay = document.querySelector(".chat-display");

// ID Selectors
const msgInput = document.querySelector("#message");
const nameInput = document.querySelector("#name");
const chatRoom = document.querySelector("#room");

function enterRoom(e) {
  e.preventDefault();
  if (nameInput.value && chatRoom.value) {
    socket.emit("enterRoom", {
      name: nameInput.value,
      room: chatRoom.value,
    });
  }
}

function sendMessage(e) {
  e.preventDefault();
  if (nameInput.value && chatRoom.value && msgInput.value) {
    socket.emit("message", {
      text: msgInput.value,
      name: nameInput.value,
    });
    msgInput.value = "";
  }
  msgInput.focus();
}

document.querySelector(".form-msg").addEventListener("submit", sendMessage);
document.querySelector(".form-join").addEventListener("submit", enterRoom);

// Listen for messages
msgInput.addEventListener("keypress", () => {
  socket.emit("activity", nameInput.value);
});

socket.on("message", (data) => {
  activity.textContent = "";
  const li = document.createElement("li");
  li.textContent = data;
  document.querySelector("ul").appendChild(li);
});

let activityTimer;
socket.on("activity", (name) => {
  activity.textContent = `${name} is typing...`;
  // clear after 3 seconds
  clearTimeout(activityTimer);
  activityTimer = setTimeout(() => {
    activity.textContent = "";
  }, 3000);
});
