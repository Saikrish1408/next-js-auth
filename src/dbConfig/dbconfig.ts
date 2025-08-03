import mongoose from "mongoose";

async function connect() {
  try {
    // creating a new connection instance
    const connection = mongoose.connection;
    // connect to MongoDB using environment variable MONGO_URL
    mongoose.connect(process.env.MONGO_URL!);

    // handling connection events
    connection.on("connected", () => {
      console.log("Connected to MongoDB!!!");
    });

    connection.on("error", (error) => {
      console.error("Error connecting to MongoDB -> ", error);
    });

    connection.on("disconnected", () => {
      console.log("MongoDB connection disconnected!!!");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB -> ", error);
  }
}

export default connect;
