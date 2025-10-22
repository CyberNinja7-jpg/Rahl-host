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

    showMessage("✅ Bot info saved successfully! Deployment in progress...");
    deployBtn.disabled = false;

    // Future step: trigger Railway or Render API here
  } catch (error) {
    console.error("Error saving bot data:", error);
    showMessage("❌ Failed to save. Please try again.", "error");
    deployBtn.disabled = false;
  }
});

function showMessage(text, type) {
  messageBox.textContent = text;
  messageBox.style.color = type === "error" ? "#ff4d4d" : "#00ffcc";
}
