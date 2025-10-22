// deploy.js
import { db } from "./firebase-config.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const deployBtn = document.getElementById("deployBtn");
const messageBox = document.getElementById("message");

deployBtn.addEventListener("click", async () => {
  const sessionId = document.getElementById("sessionId").value.trim();
  const owner = document.getElementById("owner").value.trim();
  const botName = document.getElementById("botName").value.trim();
  const prefix = document.getElementById("prefix").value.trim();
  const mode = document.getElementById("mode").value;
  const autoReact = document.getElementById("autoReact").value;
  const ownerNumber = document.getElementById("ownerNumber").value.trim();

  if (!sessionId || !botName || !prefix || !ownerNumber) {
    showMessage("⚠️ Please fill in all required fields.", "error");
    return;
  }

  deployBtn.disabled = true;
  showMessage("⏳ Deploying your bot... please wait.");

  try {
    // 1️⃣ Save to Firestore
    await addDoc(collection(db, "deployments"), {
      sessionId,
      owner,
      botName,
      prefix,
      mode,
      autoReact,
      ownerNumber,
      timestamp: serverTimestamp(),
    });

    // 2️⃣ Send to your backend for live deployment
    const backendURL = "https://your-deployment-server.onrender.com/deploy"; 
    // ⬆️ Replace with your real backend Render or Railway URL

    const response = await fetch(backendURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        owner,
        botName,
        prefix,
        mode,
        autoReact,
        ownerNumber
      })
    });

    const result = await response.json();

    if (result.success) {
      showMessage("✅ Bot deployed successfully!");
    } else {
      showMessage("❌ Deployment failed. Try again.", "error");
    }

    deployBtn.disabled = false;
  } catch (error) {
    console.error("Error deploying:", error);
    showMessage("❌ Something went wrong.", "error");
    deployBtn.disabled = false;
  }
});

function showMessage(text, type) {
  messageBox.textContent = text;
  messageBox.style.color = type === "error" ? "#ff4d4d" : "#00ffcc";
}// deploy.js
import { db } from "./firebase-config.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const deployBtn = document.getElementById("deployBtn");
const messageBox = document.getElementById("message");

deployBtn.addEventListener("click", async () => {
  const sessionId = document.getElementById("sessionId").value.trim();
  const owner = document.getElementById("owner").value.trim();
  const botName = document.getElementById("botName").value.trim();
  const prefix = document.getElementById("prefix").value.trim();
  const mode = document.getElementById("mode").value;
  const autoReact = document.getElementById("autoReact").value;
  const ownerNumber = document.getElementById("ownerNumber").value.trim();

  if (!sessionId || !botName || !prefix || !ownerNumber) {
    showMessage("⚠️ Please fill in all required fields.", "error");
    return;
  }

  deployBtn.disabled = true;
  showMessage("⏳ Deploying your bot... please wait.");

  try {
    // 1️⃣ Save to Firestore
    await addDoc(collection(db, "deployments"), {
      sessionId,
      owner,
      botName,
      prefix,
      mode,
      autoReact,
      ownerNumber,
      timestamp: serverTimestamp(),
    });

    // 2️⃣ Send to your backend for live deployment
    const backendURL = "https://your-deployment-server.onrender.com/deploy"; 
    // ⬆️ Replace with your real backend Render or Railway URL

    const response = await fetch(backendURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        owner,
        botName,
        prefix,
        mode,
        autoReact,
        ownerNumber
      })
    });

    const result = await response.json();

    if (result.success) {
      showMessage("✅ Bot deployed successfully!");
    } else {
      showMessage("❌ Deployment failed. Try again.", "error");
    }

    deployBtn.disabled = false;
  } catch (error) {
    console.error("Error deploying:", error);
    showMessage("❌ Something went wrong.", "error");
    deployBtn.disabled = false;
  }
});

function showMessage(text, type) {
  messageBox.textContent = text;
  messageBox.style.color = type === "error" ? "#ff4d4d" : "#00ffcc";
}
