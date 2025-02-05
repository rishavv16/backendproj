const mongoose = require('mongoose');
require('dotenv').config(); // Ensure dotenv is installed
mongoURL="mongodb+srv://raidmachine9513:xfYsnpAHSSORMu4l@cluster0.arg0i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected Successfully!"))
.catch(err => console.error("MongoDB Connection Error:", err));

module.exports = mongoose;