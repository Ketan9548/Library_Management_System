import express from "express";
const app = express();
import { mongosDBURL } from "./config.js";
import mongoose from "mongoose";
import Bookroute from "./Routes/BooksRoutes.js";
import cors from 'cors'

const PORT = 9990;

// meddleware for parsing request body
app.use(express.json());





//Middelware for handling Cors Polisy
// option 1: Allow all  origin with default of cors (*)
app.use(cors())
// option 2: Allow custom origins
// app.use(cors({
//   origin:"http://localhost:5173/",
//   methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"]
// }))

// all book route connection
app.use('/books',Bookroute)

mongoose
  .connect(mongosDBURL)
  .then(() => {
    console.log("App is connected to database");
    app.listen(PORT, () => {
      console.log(`App is start in port: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database Connection error and error is:", err);
  });

app.get("/", (req, res) => {
  console.log(req);
  return res.status(321).send("welcome to my backend");
});

