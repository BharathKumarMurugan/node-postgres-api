# 🚀 Nodejs Postgres API

RESTful API with Node, Express, GraphQL and Postgres

---

run postgres database. In my case I'm using docker container
```
docker run --name mypostgres --env=POSTGRES_PASSWORD=password --env=POSTGRES_USER=user --volume=/var/lib/postgresql/data -p 5432:5432 -d postgres:latest
```

Below are few graphql queries to fetch data:
1. Get All users
```
{
  getAllUsers{
    id
    name
    username
    email
    address{
      street
      suite
      city
      zipcode
      geo {
        lat
        lng
      }
    }
    phone
    website
    company {
      name
      catchPhrase
      bs
    }
  }
}
```
2. Get a particular user
```
{
  getUserByUserId(id:11) {
    id
    name
    username
    email
    address{
      street
      suite
      city
      zipcode
      geo {
        lat
        lng
      }
    }
    phone
    website
    company {
      name
      catchPhrase
      bs
    }
  }
}
```
3. create a new user
```
mutation{
  createUser(
    name: "Bharath Kumar"
    username: "bharathkumar"
    email: "bharath@test.com"
    street:"abc street"
    suite:"Suite 789"
    city: "Chennai"
    zipcode: "654321"
    lat:"-34.5672"
    lng:"56.6742"
    phone:"9876543210"
    website:"bharathkumar.net"
    companyName: "XYZ"
    catchPhrase:"some dummy catchphrase"
    bs: "I don't what the hell this is"
  ){
    id
    name
    username
    email
    address{
      street
      suite
      city
      zipcode
      geo {
        lat
        lng
      }
    }
    phone
    website
    company {
      name
      catchPhrase
      bs
    }
  }
}
```
4. update a user's data
```
mutation {
  updateUser(
    id: 11
    name: "Bharath Kumar"
    email: "test@test.com"
  ){
    id
    name
    username
    email
    address {
      street
      suite
      city
      zipcode
      geo{
        lat
        lng
      }
    }
    phone
    website
    company{
      name
      catchPhrase
      bs
    }
  }
}
```
5. delete a user
```
mutation {
  deleteUser(id: 11) {
    id
    name
    username
    email
    address {
      street
      suite
      city
      zipcode
      geo{
        lat
        lng
      }
    }
    phone
    website
    company{
      name
      catchPhrase
      bs
    }
  }
}
```