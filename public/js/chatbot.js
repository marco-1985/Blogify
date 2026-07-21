const chatBtn = document.getElementById("chatBtn");
const chatWindow = document.getElementById("chatWindow");
const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("messageInput");
const messages = document.getElementById("messages");
const clearChatBtn = document.getElementById("clearChatBtn");
const aiNavLink = document.getElementById("aiNavLink");
chatBtn.onclick = () => {

    chatWindow.style.display =
        chatWindow.style.display === "none"
            ? "block"
            : "none";

};

sendBtn.onclick = sendMessage;

messageInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        sendMessage();

    }

});

async function sendMessage() {

    const message = messageInput.value.trim();

    if (!message) return;

    addMessage("You", message);

    messageInput.value = "";

    addMessage("AI", "Typing...");

    const response = await fetch("/ai/chat", {

        method: "POST",

        headers: {

            "Content-Type": "application/json",

        },

        body: JSON.stringify({

            blogId: BLOG_ID,

            message,

        }),

    });

    const data = await response.json();

    messages.lastChild.remove();

    addMessage("AI", data.reply);

}

function addMessage(sender, text) {

    const div = document.createElement("div");

    div.className = "mb-3";

    div.innerHTML = `
        <strong>${sender}</strong>

        <div class="border rounded p-2 mt-1">

            ${text}

        </div>
    `;

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;

}

clearChatBtn.addEventListener("click", () => {

    messages.innerHTML = `
        <div class="text-muted small mb-2">
            👋 Hello! I'm <strong>Chitti AI</strong>.<br>
            Ask me anything about this blog.
        </div>
    `;

    messageInput.value = "";

});
if (messages.innerHTML.trim() === "") {

    messages.innerHTML = `
        <div class="text-muted small mb-2">
            👋 Hello! I'm <strong>Chitti AI</strong>.<br>
            Ask me anything about this blog.
        </div>
    `;

}

if (aiNavLink) {

    aiNavLink.addEventListener("click", (e) => {

        e.preventDefault();

        chatWindow.style.display = "block";

    });

}
const text = "Ask Chitti";

const typingText = document.getElementById("typingText");

let i = 0;

let deleting = false;

function typeAnimation() {

    if (!deleting) {

        typingText.textContent = text.substring(0, i++);

        if (i > text.length) {

            deleting = true;

            setTimeout(typeAnimation, 2000);

            return;
        }

    } else {

        typingText.textContent = text.substring(0, i--);

        if (i < 0) {

            deleting = false;
        }

    }

    setTimeout(typeAnimation, deleting ? 60 : 120);
}

typeAnimation();