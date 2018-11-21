import express from "express";
import Word from "../models/word";
import { send } from "../utils";
import cache from "../utils/cache";

const router = express.Router();

router.get("/", cache(100), (req, res) => {
  Word.find({}).exec((err, items) =>
    send(err, items, items => items, req, res)
  );
});

router.get("/:name", cache(100), (req, res) => {
  Word.findOne({ name: req.params.name })
    .populate({
      path: "pstatements",
      populate: {
        path: "tools",
        model: "Tool",
        select: "name"
      }
     })
    .exec((err, result) => send(err, result, result => result, req, res));
});

router.post("/", (req, res) => {
  new Word(req.body).save((err, result) =>
    send(err, result, result => result, req, res)
  );
});

router.delete("/:name", (req, res) => {
  Word.findOneAndDelete({ name: req.params.name }).exec((err, result) =>
    send(err, result, () => `Word ${req.params.name} deleted`, req, res)
  );
});

router.put("/:name", (req, res) => {
  const word = new Word(req.body);
  const { name } = word;
  delete word._id;
  Word.findOneAndUpdate({ name }, word, {
    new: true
  }).exec((err, result) => send(err, result, result => result, req, res));
});

router.patch("/:name", (req, res) => {
  Word.findOneAndUpdate(
    { name: req.params.name },
    { $push: { pstatements: { $each: [].concat(req.body.pstatements) } } },
    {
      new: true
    }
  ).exec((err, result) => send(err, result, result => result, req, res));
});

export default router;
