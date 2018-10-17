import express from "express";
import Tool from "../models/tool";
import { send } from "../utils";
import cache from "../utils/cache";

const router = express.Router();

router.get("/tool", cache(100), (req, res) => {
  Tool.find({}).exec((err, items) =>
    send(err, items, items => items, req, res)
  );
});

router.get("/tool/:id", cache(100), (req, res) => {
  Tool.findById(req.params.id).exec((err, result) =>
    send(err, result, result => result, req, res)
  );
});

router.post("/tool", (req, res) => {
  new Tool(req.body).save((err, result) =>
    send(err, result, result => result, req, res)
  );
});

router.delete("/tool/:id", (req, res) => {
  Tool.findByIdAndRemove(req.params.id).exec((err, result) =>
    send(err, result, result => result, req, res)
  );
});

router.put("/tool/:id", (req, res) => {
  const tool = new Tool(req.body);
  const _id = delete word._id;
  Word.findByIdAndUpdate(_id, tool, {
    new: true
  }).exec((err, result) => send(err, result, result => result, req, res));
});

export default router;
