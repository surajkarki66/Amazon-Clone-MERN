import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import connectDb from "./configs/db";
import authRouter from './routes/auth.route';
import productRouter from './routes/product.route';
import orderRouter from './routes/order.route';

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

// Use routes
app.use('/api/', authRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
