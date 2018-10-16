import Tool from "../models/tool";
import { send } from "../utils";
import cache from "../utils/cache";

export default app => {
  app.get("/tool", cache(100), (req, res) => {
    Tool.find({}).exec((err, items) =>
      send(err, items, items => items, req, res)
    );
  });

  app.get("/tool/:id", cache(100), (req, res) => {
    Tool.findById(req.params.id).exec((err, result) =>
      send(err, result, result => result, req, res)
    );
  });

  app.post("/tool", (req, res) => {
    new Tool(req.body).save((err, result) =>
      send(err, result, result => result, req, res)
    );
  });

  app.delete("/tool/:id", (req, res) => {
    Tool.findByIdAndRemove(req.params.id).exec((err, result) =>
      send(err, result, result => result, req, res)
    );
  });

  app.put("/tool/:id", (req, res) => {
    const tool = new Tool(req.body);
    const _id = delete word._id;
    Word.findByIdAndUpdate(_id, tool, {
      new: true
    }).exec((err, result) => send(err, result, result => result, req, res));
  });
};
