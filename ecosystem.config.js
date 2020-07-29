module.exports = {
  apps: [
    {
      name: "myapp",
      script: "./app.js",
      watch: true,
      env: {
        PORT: 3001,
        NODE_ENV: "development",
        DATABASE_PASSWORD: "aaasuldb",
        JWT_SECRET: "SUL",
      },
    },
  ],
};
