const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;
app.use(cors());

app.get("/", (req, res) => {
  res.json({ status: 200, data: "hello world" });
});

app.get("/data", (_, res) => {
  console.log("button clicked");
  res.send({
    express: "Get Data",
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
