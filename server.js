// server.js
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

dotenv.config();

initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/deploy", async (req, res) => {
  try {
    const { sessionId, owner, botName, prefix, mode, autoReact, ownerNumber } = req.body;

    // Example: Railway API or Render API call
    const deployResponse = await fetch("https://api.render.com/v1/services/SERVICE_ID/deploys", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RENDER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        triggerType: "manual",
        clearCache: true,
        metadata: {
          sessionId,
          owner,
          botName,
          prefix,
          mode,
          autoReact,
          ownerNumber
        }
      })
    });

    const deployResult = await deployResponse.json();

    await db.collection("deployments").add({
      sessionId,
      owner,
      botName,
      prefix,
      mode,
      autoReact,
      ownerNumber,
      status: "Deployed",
      deployedAt: new Date().toISOString(),
      response: deployResult
    });

    res.json({ success: true, message: "Bot deployed successfully!", deployResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Deployment failed", error: error.message });
  }
});

app.listen(5000, () => console.log("Lord Rahl Deployment Server running on port 5000"));
