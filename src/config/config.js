module.exports = {
  development: {
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "SUL",
    host: "localhost",
    dialect: "mysql",
    logging: false,
  },
};
