var mongoose = require("mongoose");

var connectDatabase = () => {
  const mongoDbUrl = `mongodb+srv://honghm:0377846295a1@cluster0.vfjbe.mongodb.net/work_schedule?retryWrites=true&w=majority`;
  console.log(`Connecting to ${mongoDbUrl}`);
  mongoose.Promise = global.Promise;
  // Connecting to the database
  mongoose
    .connect(mongoDbUrl)
    .then(() => {
      console.log("Successfully connected to the database");
    })
    .catch((err) => {
      console.log(`Could not connect to the database. Exiting now...\n${err}`);
      process.exit();
    });
};
module.exports = connectDatabase; 

