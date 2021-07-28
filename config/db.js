const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    // console.log(db);
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.log(error.msg);
    console.log(error);
    //Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
