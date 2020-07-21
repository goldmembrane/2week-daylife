module.exports = {
  apps: [
    {
      name: "myapp",
      script: "./app.js",
      watch: true,
      env: {
        PORT: 3001,
        NODE_ENV: "development",
        DATABASE_PASSWORD: "mysql3593**",
        JWT_SECRET: "SUL",
      },
    },
  ],
};
