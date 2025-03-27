module.exports = {
  apps: [
    {
      name: "express-app",
      script: "./app.js",
      env: {
        NODE_ENV: "development",
        PORT: 3000,
      },
      instances: 1,
      watch: true,
      // exec_mode: "cluster",
      // env_production: {
      //   NODE_ENV: "production",
      // },
      // env_development: {
      //   NODE_ENV: "development",
      // },
    },
  ],
};
