import { Book } from "../model/bookModel.js";
import express from "express";

const router = express.Router();
router.get("/", async (req, resp) => {
  try {
    const books = await Book.find({});

    return resp.status(200).json({ count: books.length, data: books });
  } catch (error) {
    console.log(error.message);
    return resp.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, resp) => {
  try {
    const { id } = req.params;
    console.log(id);
    const book = await Book.findById(id);

    return resp.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    return resp.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (req, resp) => {
  const { id } = req.params;
  console.log(`update book ${id}`);
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return resp
        .status(400)
        .send({ message: "please check you request body" });
    }
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return resp.status(400).send({ message: "book not found" });
    }
    console.log(result);
    return resp.status(200).send({ message: "update success" });
  } catch (error) {
    console.log(error.message);
    return resp.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, resp) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return resp.status(404).send(result);
    }
    return resp.status(200).send(result);
  } catch (error) {
    console.log(error.message);
    return resp.status(500).send({ message: error.message });
  }
});

router.post("/", async (req, resp) => {
  try {
    console.log(req.body);
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      console.log("bad request");
      return resp.status(400).send({ message: "please review you parameters" });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);

    return resp.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    return resp.status(500).send({ message: error.message });
  }
});

export default router;
