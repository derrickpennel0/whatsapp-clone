// import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let connectDB;

try {
  connectDB = async () => {
    const db = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (!db) {
      console.log(`no connection to db`);
    } else {
      console.log(`connected to db`);
    }
  };
} catch {
  if (err) {
    console.log(`error`);
  }
} finally {
  console.log(`finally running`);
}

export default connectDB;
