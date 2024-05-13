const express = require("express");
const cors = require("cors");
const axios = require("axios"); // Import axios

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;

  try {
    // Correct axios.put syntax
    const r = await axios.put('https://api.chatengine.io/users/', 
      { username: username, secret: username, first_name: username },
      { headers: { "private-key": "a3a6e40a-c0de-4fe9-8cdb-6cef2997df0f" } }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    // Correctly handle errors
    if (e.response) {
      return res.status(e.response.status).json(e.response.data);
    } else {
      // Handle cases where the error does not come from a HTTP response
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

app.listen(3001);
