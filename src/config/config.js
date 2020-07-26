module.exports = {
  development: {
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "AAASUL",
    host: "localhost",
    dialect: "mysql",
    logging: false,
  },
};
