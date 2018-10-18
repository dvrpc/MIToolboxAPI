import express from "express";
import Pstatement from "../models/pstatement";
import { send } from "../utils";
import cache from "../utils/cache";

const router = express.Router();

router.get("/", cache(100), (req, res) => {
  Pstatement.find({}).exec((err, items) =>
    send(err, items, items => items, req, res)
  );
});

router.get("/:id", cache(100), (req, res) => {
  Pstatement.findById(req.params.id).populate('tools').exec((err, result) =>
    send(err, result, result => result, req, res)
  );
});

router.post("/", (req, res) => {
  new Pstatement(req.body).save((err, result) =>
    send(err, result, result => result, req, res)
  );
});

router.delete("/:id", (req, res) => {
  Pstatement.findByIdAndDelete(req.params.id).exec((err, result) =>
    send(err, result, result => result, req, res)
  );
});

router.put("/:id", (req, res) => {
  const pstatement = new Pstatement(req.body);
  delete pstatement._id;
  Pstatement.findOneAndUpdate({ description }, pstatement, {
    new: true
  }).exec((err, result) => send(err, result, result => result, req, res));
});

router.patch("/:id", (req, res) => {
  Pstatement.findByIdAndUpdate(
    req.params.id,
    { $push: { tools: { $each: [].concat(req.body.tools) } } },
    {
      new: true
    }
  ).exec((err, result) => send(err, result, result => result, req, res));
});

export default router;
