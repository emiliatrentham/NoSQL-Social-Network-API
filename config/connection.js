// Week 18 / Activity 18 

const mongoose = require('mongoose');

// Wrap Mongoose around local connection to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social_db',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Get a debug output in the console if there is an issue
mongoose.set('debug', true);

// Export connection 
module.exports = mongoose.connection;