const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// GET route for verification
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "my_secret_token";
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Webhook verified!");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// POST route to receive webhook events
app.post("/webhook", (req, res) => {
  console.log("📩 Webhook Event Received:");
  console.dir(req.body, { depth: null });
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`✅ Webhook server running on port ${PORT}`);
});





