const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
    });
    console.log(`Connected to mainDB at ${mongoose.connection.host}`);
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
};

// Enhanced connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to mainDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

module.exports = connectDB;