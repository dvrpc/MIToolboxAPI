import express from "express";
import Section from "../models/section";
import { send } from "../utils";
import cache from "../utils/cache";

const router = express.Router();

router.get("/", cache(100), (req, res) => {
  Section.find({})
    .populate("tools", "name")
    .exec((err, items) => send(err, items, items => items, req, res));
});

router.get("/:id", cache(100), (req, res) => {
  Section.findById(req.params.id)
    .populate("tools", "name")
    .exec((err, result) => send(err, result, result => result, req, res));
});

router.get("/tool/:id", cache(100), (req, res) => {
  Section.findOne({ tools: req.params.id })
    .populate("tools", "name")
    .exec((err, result) => send(err, result, result => result, req, res));
});

router.post("/", (req, res) => {
  new Section(req.body).save((err, result) =>
    send(err, result, result => result, req, res)
  );
});

router.delete("/:id", (req, res) => {
  Section.findByIdAndDelete(req.params.id).exec((err, result) =>
    send(err, result, result => result, req, res)
  );
});

router.put("/:id", (req, res) => {
  const Section = new Section(req.body);
  delete Section._id;
  Section.findOneAndUpdate({ description }, Section, {
    new: true
  }).exec((err, result) => send(err, result, result => result, req, res));
});

router.patch("/:id", (req, res) => {
  Section.findByIdAndUpdate(
    req.params.id,
    { $push: { tools: { $each: [].concat(req.body.tools) } } },
    {
      new: true
    }
  ).exec((err, result) => send(err, result, result => result, req, res));
});

export default router;
