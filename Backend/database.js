const mongoose = require("mongoose");

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect("mongodb://localhost:27017/", connectionParams);
    console.log("Connected to Database");
  } catch (error) {
    console.log(error);
    console.log("Error in Connecting with database");
  }
};
