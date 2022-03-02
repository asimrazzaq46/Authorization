const dotenv = require("dotenv");

const app = require("./app");
const connectDatabase = require("./config/database");

dotenv.config({ path: "server/config/config.env" });

//CAUGHT ERROR AND CLOSE THE SYSTEM

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.stack}`);
  console.log(`shutting down due to some uncaughtException`);
  process.exit(1);
});

// CONNECTING TO DATABASE

connectDatabase();

// CONNECTING TO SERVER

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

// SHUTTING DOWN SERVER ON ERROR

process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log(`shutting down due to some unhandled Promise  Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
