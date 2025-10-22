// === Firebase client logic ===
// You’ll fill firebase-config.js separately (Firebase Auth + Firestore config)
const backendUrl = window.location.origin; // same domain

// Example login
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    const user = await firebase.auth().signInWithEmailAndPassword(email, password);
    localStorage.setItem("userEmail", user.user.email);
    window.location.href = "dashboard.html";
  } catch (error) {
    alert(error.message);
  }
}

// Deploy form submit
const form = document.getElementById("deployForm");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      SESSION_ID: document.getElementById("SESSION_ID").value,
      OWNER_NAME: document.getElementById("OWNER_NAME").value,
      PREFIX: document.getElementById("PREFIX").value,
      AUTO_REACT: document.getElementById("AUTO_REACT").value,
      AUTO_READ_STATUS: document.getElementById("AUTO_READ_STATUS").value,
      MODE: document.getElementById("MODE").value,
      THEME: document.getElementById("THEME").value,
      APP_NAME: document.getElementById("APP_NAME").value,
      DEPLOY_PLATFORM: document.getElementById("DEPLOY_PLATFORM").value,
    };

    try {
      const res = await fetch(`${backendUrl}/deploy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      document.getElementById("deployMessage").textContent = data.message;
    } catch (err) {
      document.getElementById("deployMessage").textContent = "Error deploying bot.";
    }
  });
}

// Dashboard data
if (window.location.pathname.includes("dashboard")) {
  document.getElementById("userEmail").textContent = localStorage.getItem("userEmail") || "Guest";
  document.getElementById("userCoins").textContent = "20"; // temporary static value
}
