import express from "express";
import Tool from "../models/tool";
import Section from "../models/section";
import { send } from "../utils";
import cache from "../utils/cache";

const router = express.Router();

router.get("/", cache(100), (req, res) => {
  Tool.find({}).exec((err, items) =>
    send(err, items, items => items, req, res)
  );
});

router.get("/:id", cache(100), async (req, res) => {
  Section.findOne({ tools: { $in: req.params.id } })
    .populate("tools", "name")
    .exec((err, section) => {
      Tool.findById(req.params.id).exec((err, result) =>
        send(
          err,
          result,
          result => {
            if (section) {
              result.relatedTools = section.tools;
            }
            return result;
          },
          req,
          res
        )
      );
    });
});

router.post("/", (req, res) => {
  new Tool(req.body).save((err, result) =>
    send(err, result, result => result, req, res)
  );
});

router.delete("/:id", (req, res) => {
  Tool.findByIdAndRemove(req.params.id).exec((err, result) =>
    send(err, result, result => result, req, res)
  );
});

router.put("/:id", (req, res) => {
  const tool = new Tool(req.body);
  const _id = delete word._id;
  Word.findByIdAndUpdate(_id, tool, {
    new: true
  }).exec((err, result) => send(err, result, result => result, req, res));
});

export default router;
