const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((con) => {
      console.log(`Database is connected with HOST: ${con.connection.host}`);
    });
};

module.exports = connectDatabase;
