const mongoose = require('mongoose');
const config = require('./keys');
const db = config.mongoURI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log("database connected")
  } catch (error) {
    console.log("error connecting to database");
    process.exit(1);
  }
}; 

module.exports = connectDB;