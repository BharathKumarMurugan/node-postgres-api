const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.NODE_API_PORT || 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("All set to go");
});

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
