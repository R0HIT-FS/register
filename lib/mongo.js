import mongoose  from 'mongoose';

const uri = process.env.MONGODB_URI; // Ensure you have your MongoDB URI stored in .env file

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let connection;

async function connectToDatabase() {
  if (connection) return connection;

  try {
    connection = await mongoose.connect(uri, options);
    console.log("Successfully connected to MongoDB");
    return connection;
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
}

module.exports = connectToDatabase;