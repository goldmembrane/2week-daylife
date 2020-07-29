module.exports = {
  development: {
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "SUL",
    host: "localhost",
    port: 13306,
    dialect: "mysql",
    logging: false,
  },
};
