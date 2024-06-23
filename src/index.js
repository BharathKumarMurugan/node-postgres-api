const express = require("express");
const bodyParser = require("body-parser");
const db = require('./queries');

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

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
