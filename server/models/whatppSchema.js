import mongoose from "mongoose";

const whatappSchemas = mongoose.Schema({
  name: String,
  message: String,
  received: Boolean,
  timestamp: String,
});

const whatappSchema = mongoose.model("messagecontent", whatappSchemas);

export default whatappSchema;
