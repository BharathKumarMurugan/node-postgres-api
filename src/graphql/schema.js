const { buildSchema } = require("graphql");
const pool = require("./../conf/dbconfig");
const { users } = require("./../mockData");

const schema = buildSchema(`
  type Query {
    getUserByUserId(id: Int!): User
    getAllUsers: [User]
  }
  type Mutation {
    createUser(
      name: String!
      email: String!
      username: String!
      street: String
      suite: String
      city: String
      zipcode: String
      lat: String
      lng: String
      phone: String
      website: String
      companyName: String
      catchPhrase: String
      bs: String
    ): User
  }
  type User {
    id: Int
    name: String
    email: String
    username: String
    address: Address
    phone: String
    website: String
    company: Company
  }
  type Address {
    street: String
    suite: String
    city: String
    zipcode: String
    geo: Geo
  }
  type Geo {
    lat: String
    lng: String
  }
  type Company {
    name: String
    catchPhrase: String
    bs: String
  }
`);

const root = {
  // hello: () => "This is a first message from graphql",
  // getUserByUserId: async ({ id}) => {
  //   const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  //   return res.rows[0];
  getUserByUserId: ({id}) => {
    return users.find(user => user.id === id);
  },
  getAllUsers: () => {
    return users;
  },
  createUser: ({
    name,
    email,
    username,
    street,
    suite,
    city,
    zipcode,
    lat,
    lng,
    phone,
    website,
    companyName,
    catchPhrase,
    bs
  }) => {
    const newUser = {
      id: users.length + 1,
      name,
      email,
      username,
      address: {
        street,
        suite,
        city,
        zipcode,
        geo: {
          lat,
          lng
        }
      },
      phone,
      website,
      company: {
        name: companyName,
        catchPhrase,
        bs
      }
    };
    users.push(newUser);
    return newUser;
  }
};

module.exports = { schema, root };
