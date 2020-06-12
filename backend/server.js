import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import connectDb from "./configs/db";

// Config .env to ./config/config.env
dotenv.config({
  path: "./configs/configs.env",
});

// Connect to database.
connectDb();

const app = express();

// Config body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use(morgan("dev"));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
