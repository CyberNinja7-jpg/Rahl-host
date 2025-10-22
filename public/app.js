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
// === Coins Page ===
if (document.getElementById("claimBtn")) {
  const claimBtn = document.getElementById("claimBtn");
  const coinMsg = document.getElementById("coinMsg");
  const coinBalance = document.getElementById("coinBalance");

  let coins = parseInt(localStorage.getItem("coins") || "20");
  coinBalance.textContent = coins;

  claimBtn.addEventListener("click", () => {
    const lastClaim = localStorage.getItem("lastClaim");
    const today = new Date().toDateString();
    if (lastClaim === today) {
      coinMsg.textContent = "You already claimed your daily coins today!";
    } else {
      coins += 20;
      localStorage.setItem("coins", coins);
      localStorage.setItem("lastClaim", today);
      coinBalance.textContent = coins;
      coinMsg.textContent = "🎉 You claimed 20 coins!";
    }
  });
}

// === My Bots Page ===
if (document.getElementById("botList")) {
  const botList = document.getElementById("botList");
  fetch(`${backendUrl}/deployments`)
    .then(res => res.json())
    .then(data => {
      botList.innerHTML = "";
      data.forEach(bot => {
        botList.innerHTML += `
          <tr>
            <td>${bot.APP_NAME}</td>
            <td>${bot.SESSION_ID.slice(0, 6)}...</td>
            <td>${bot.status}</td>
          </tr>`;
      });
    });
}

// === Profile Page ===
if (document.getElementById("profileEmail")) {
  document.getElementById("profileEmail").textContent = localStorage.getItem("userEmail");
  document.getElementById("profileUID").textContent = "USR-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  document.getElementById("profileDeploys").textContent = Math.floor(Math.random() * 10); // temporary
}
