const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {graphqlHTTP} = require("express-graphql");
const {schema, root} = require("./graphql/schema");
const db = require("./queries");

const app = express();
const PORT = process.env.NODE_API_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// app.use((req, res, next) => {
//   const error = new Error("Something went wrong");
//   next(error);
// });
// app.use((err, req, res, next) => {
//   console.error("Error: ", err.message);
//   res.status(500).send("Internal Server error");
// });

app.get("/", (req, res) => {
  res.send("All set to go");
});

app.use("/graphql", graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
app.post("/users", db.createUser);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
