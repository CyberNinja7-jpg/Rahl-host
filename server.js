import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import admin from "firebase-admin";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Firebase admin setup
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

// ✅ Deploy route
app.post("/deploy", async (req, res) => {
  const { SESSION_ID, OWNER_NAME, PREFIX, MODE, AUTO_REACT, AUTO_READ_STATUS, APP_NAME } = req.body;
  try {
    // Save to Firestore
    await db.collection("deployments").add({
      SESSION_ID,
      OWNER_NAME,
      PREFIX,
      MODE,
      AUTO_REACT,
      AUTO_READ_STATUS,
      APP_NAME,
      status: "pending",
      createdAt: new Date().toISOString()
    });

    // TODO: integrate Render API here later
    res.json({ success: true, message: "Bot deployment request saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error saving deployment" });
  }
});

app.listen(3000, () => console.log("Lord Rahl Bot Platform running on port 3000"));
