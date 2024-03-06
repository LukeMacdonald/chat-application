const socket = io("ws://localhost:3500");

const msgInput = document.querySelector("input");
function sendMessage(e) {
  e.preventDefault();
  if (msgInput.value) {
    socket.emit("message", msgInput.value);
    msgInput.value = "";
  }
  msgInput.focus();
}

const activity = document.querySelector(".activity");
document.querySelector("form").addEventListener("submit", sendMessage);

// Listen for messages
msgInput.addEventListener("keypress", () => {
  socket.emit("activity", socket.id.substring(0, 5));
});

socket.on("message", (data) => {
  const li = document.createElement("li");
  li.textContent = data;
  document.querySelector("ul").appendChild(li);
});

socket.on("");
