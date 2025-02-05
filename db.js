const mongoose = require('mongoose');
require('dotenv').config(); // Ensure dotenv is installed
const mongoURL = process.env.mongoURL; 

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected Successfully!"))
.catch(err => console.error("MongoDB Connection Error:", err));

module.exports = mongoose;