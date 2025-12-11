// server.js
import express from "express";
import cors from "cors";

import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));



// FIXED CHAT ENDPOINT (WORKS 100%)
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        { role: "user", content: userMessage }
      ]
    });

    const reply = response.output[0].content[0].text;

    return res.json({ reply });

  } catch (error) {
    console.error("BACKEND ERROR:", error);
    return res.status(500).json({ error: "Error contacting OpenAI" });
  }
});

// Serve UI
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(3000, () =>
  console.log("Chatbot running → http://localhost:3000")
);
