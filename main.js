const chatBox = document.querySelector(".chat-box");
const input = document.querySelector(".chat-input");
const submit = document.querySelector(".chat-box-footer");
const chatMessages = document.querySelector(".chatMessages");

submit.addEventListener("submit", async (e) => {
  e.preventDefault();
  botMassage();
});
function botMassage() {
  const user = input.value;
  input.value = "";
  chatMessages.innerHTML += `<div class="message user">
  <img src="./icons/user.png" alt="user icon"> <span>${user}</span>
  </div>`;
  scrollToBottom();

  fetch("http://localhost:5000/message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt: user })
  })
  .then(response => response.json())
  .then(data => {
    chatMessages.innerHTML += `<div class="message botMessage">
    <img src="./icons/chatbot.png" alt="bot icon"> <span>${data.message}</span>
    </div>`;
    scrollToBottom();
  })
}

function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}