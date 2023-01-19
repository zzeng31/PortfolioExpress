const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewURlParser: true,
      useCreateIndex: true,
    });

    console.log("MongoDb Connected...");
  } catch (err) {
    console.err(err.message);
    // Exit process with failure
    process.exit(1);
  }
};
mongoose.connect(db);

module.exports = connectDB;
