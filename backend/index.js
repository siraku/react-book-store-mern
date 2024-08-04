import express from "express";
import cors from "cors";
import { PORT, MONGODB_URI } from "./config.js";
import mongoose from "mongoose";
import router from "./routes/booksRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`APP is listning on ${PORT}`);
});

app.get("/", (request, response) => {
  response.status(200).send("hello world");
});

app.use("/books", router);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.log(error);
  });
