import Word from "../models/word";
import { send } from "../utils";
import cache from "../utils/cache";

export default app => {
  app.get("/word", cache(100), (req, res) => {
    Word.find({}).exec((err, items) =>
      send(err, items, items => items.map(item => item.name), req, res)
    );
  });

  app.get("/word/:name", cache(100), (req, res) => {
    Word.findOne({ name: req.params.name }).exec((err, result) =>
      send(err, result, result => result, req, res)
    );
  });

  app.post("/word", (req, res) => {
    new Word(req.body).save((err, result) =>
      send(err, result, result => result, req, res)
    );
  });

  app.delete("/word/:name", (req, res) => {
    Word.findOneAndDelete({ name: req.params.name }).exec((err, result) =>
      send(err, result, () => `Word ${req.params.name} deleted`, req, res)
    );
  });

  app.put("/word/:name", (req, res) => {
    const word = new Word(req.body);
    const { name } = word;
    delete word._id;
    Word.findOneAndUpdate({ name }, word, {
      new: true
    }).exec((err, result) => send(err, result, result => result, req, res));
  });
};
