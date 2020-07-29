module.exports = {
  development: {
    username: "AAA",
    password: process.env.DATABASE_PASSWORD,
    database: "SUL",
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    logging: false,
  },
};
