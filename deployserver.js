// deployServer.js
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Lord Rahl Bot Deployment API is Live!");
});

app.post("/deploy", async (req, res) => {
  try {
    const { sessionId, botName, owner, prefix, mode, autoReact, ownerNumber } = req.body;

    if (!sessionId || !botName) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Example log
    console.log("Received deployment:", req.body);

    // Here, you can later trigger actual bot deployment logic (Railway, Render API, etc.)

    res.json({
      success: true,
      message: `Bot ${botName} received successfully.`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Deployment error:", error);
    res.status(500).json({ error: "Server error during deployment." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
