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
    updateUser(
      id: Int!
      name: String
      email: String
      username: String
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
    deleteUser(id: Int!): User
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
  getUserByUserId: ({ id }) => {
    return users.find((user) => user.id === id);
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
    bs,
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
          lng,
        },
      },
      phone,
      website,
      company: {
        name: companyName,
        catchPhrase,
        bs,
      },
    };
    users.push(newUser);
    return newUser;
  },
  updateUser: ({
    id,
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
    bs,
  }) => {
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    user.name = name || user.name;
    user.username = username || user.username;
    user.email = email || user.email;
    user.address = {
      street: street || user.street,
      suite: suite || user.suite,
      city: city || user.city,
      zipcode: zipcode || user.zipcode,
      geo: {
        lat: lat || user.lat,
        lng: lng || user.lng,
      },
    };
    user.phone = phone || user.phone;
    user.website = website || user.website;
    user.company = {
      name: companyName || user.companyName,
      catchPhrase: catchPhrase || user.catchPhrase,
      bs: bs || user.bs,
    };
    return user;
  },
  deleteUser: ({ id }) => {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new Error(`User with id ${id} not found`);
    }
    const deletedUser = users.splice(userIndex, 1);
    return deletedUser[0];
  },
};

module.exports = { schema, root };
