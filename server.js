import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import {
  errorResponseHandler,
  invalidRoute,
} from "./middleware/errorHandler.js";
import userRouter from "./routes/userRoute.js";

const app = express();
dotenv.config();
mongoose.set("strictQuery", false);

app.use(express.json());

app.use("/api/user", userRouter);

app.use(invalidRoute);
app.use(errorResponseHandler);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, console.log("server is listing"));
  } catch (error) {
    console.log(error);
  }
};

start();
