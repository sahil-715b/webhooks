const express = require("express");
const fetch = require('node-fetch'); // install this package if not yet

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
app.post("/webhook", async (req, res) => {
  const body = req.body;

  if (body.object === "instagram") {
    for (const entry of body.entry) {
      for (const change of entry.changes) {
        if (change.field === "comments") {
          const comment = change.value;
          const username = comment.from.username;
          const commentId = comment.comment_id;

          // Example: Send a reply message or DM here using Instagram Messaging API
          // You’ll need to call Instagram Graph API with a valid access token
          // to send a message to this user.

          console.log(`New comment by ${username}: ${comment.text}`);

          // Your message sending logic here
        }
      }
    }
  }

  res.sendStatus(200);
});


app.listen(PORT, () => {
  console.log(`✅ Webhook server running on port ${PORT}`);
});





