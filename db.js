const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://raidmachine9513:xfYsnpAHSSORMu4l@cluster0.arg0i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected Successfully!"))
.catch(err => console.error("MongoDB Connection Error:", err));

module.exports = mongoose;
