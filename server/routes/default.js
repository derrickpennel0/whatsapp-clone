import express from "express";
import Messages from "../models/whatppSchema.js";
import mongoose from "mongoose";
import { pusher } from "../config/config.js";

const app = express();

// configuration for pusher once the db is connected
const db = mongoose.connection;
db.once("open", () => {
  console.log("pusher ooo pusher");

  const changeStream = db.collection("messagecontents").watch();
  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        received: messageDetails.received,
        timestamp: messageDetails.timestamp,
      });
    } else {
      console.log("error occured with pusher");
    }
    // console.log({ change });
  });
});

// ALL APIS HERE

//  create a new message
app.post("/messages/new", (req, res) => {
  const newVideo = req.body;
  Messages.create(newVideo)
    .then((result) => {
      return res.status(201).send({
        message: "Created successfully",
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
});

app.get("/messages/sync", (req, res) => {
  Messages.find()
    .then((result) => {
      return res.status(201).send(result);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
});

export default app;
