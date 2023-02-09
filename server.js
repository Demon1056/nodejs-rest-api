const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { HOST_URI } = process.env;

dotenv.config();

mongoose.set("strictQuery", false);

const mainFunction = async () => {
  try {
    await mongoose.connect(HOST_URI);
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  } catch (error) {
    console.log(`Server isn't runing because ${error.message}`);
    process.exit(1);
  }
};

mainFunction();
