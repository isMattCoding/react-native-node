require("ts-node/register");

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./dev.sqlite3",
    },
    migrations: {
      directory: "./node-back/data/migrations",
    },
    seeds: {
      directory: "./node-back/data/seeds",
    },
    useNullAsDefault: true,
  },

  production: {
    client: "mysql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    migrations: {
      directory: "./node-back/data/migrations",
    },
    seeds: {
      directory: "./node-back/data/seeds",
    },
  },
};
