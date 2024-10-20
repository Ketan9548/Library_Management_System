import express from "express";
import { Book } from "../Models/BookModels.js";

const routes = express.Router();

// route for save the new Book
routes.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.Publishyear) {
      return res.status(400).send({
        message: "send all required field : Book Model",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      Publishyear: req.body.Publishyear,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log("error in making database:", error.messsage);
    res.status(500).send({ message: error.message });
  }
});

// route for get all books from database
routes.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log("error for get all books in databae: ", error.message);
  }
});

// route for get one book from database
routes.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log("error for get one book from database: ", error.message);
  }
});

// route for updating a Book
routes.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.Publishyear) {
      return res.status(400).send({
        message: "send all required field : Book Model",
      });
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ message: "Book is not found" });
    }
    return res.status(200).json({ message: "Book Update succesfully" });
  } catch (error) {
    console.log("error updating the book in database: ", error.message);
  }
});

// Route For Deleate the book in database
routes.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id, req.body);
    if (!result) {
      return res.status(404).json({ message: "Book is not found" });
    }
    return res.status(200).json({ message: "Book deleate Succesfully" });
  } catch (error) {
    console.log("Error in deleate the book in databaser", error);
  }
});

export default routes;
