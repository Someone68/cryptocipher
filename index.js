const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Server listening on port ${3000}`);
});
