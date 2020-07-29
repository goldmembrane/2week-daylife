module.exports = {
  development: {
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "AAASUL",
    host: "sul-database-deploy.csmeh7i5hzpa.ap-northeast-2.rds.amazonaws.com",
    port: 3306,
    dialect: "mysql",
    logging: false,
  },
};
