# 🚀 Nodejs Postgres API

RESTful API with Node, Express, and Postgres

---

run postgres database. In my case I'm using docker container
```
docker run --name mypostgres --env=POSTGRES_PASSWORD=password --env=POSTGRES_USER=user --volume=/var/lib/postgresql/data -p 5432:5432 -d postgres:latest
```