const { buildSchema } = require("graphql");
const pool = require("./../conf/dbconfig");

const schema = buildSchema(`
  type Query {
    getUserByUserId(id: Int!): User
  }
  type User {
    id: Int
    name: String
    email: String
  }
`);

const root = {
  // hello: () => "This is a first message from graphql",
  getUserByUserId: async ({ id}) => {
    const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return res.rows[0];
  }
};

module.exports = { schema, root };
