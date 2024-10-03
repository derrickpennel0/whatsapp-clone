import express from "express";
import cors from "cors";
import Main from "./routes/default.js";
import connectDB from "./db/database.js";
import bodyParser from "body-parser";
import Pusher from "pusher";
// APP CONFIG
const app = express();
const port = process.env.PORT || 8000;

// MIDDLEWARES
app.use(express.json());
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/", Main);

// DB CONFIG
connectDB();

// API ENDPOINTS
app.get("/", (req, res) => res.status(200).send("Welcome Derrick"));

// LISTERNER
app.listen(port, () => console.log(`Listening on localhost:${port}`));
