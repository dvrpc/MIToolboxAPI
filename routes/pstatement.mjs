import express from "express";
import Pstatement from "../models/pstatement";
import { send } from "../utils";
import cache from "../utils/cache";

const router = express.Router();

router.get("/pstatement", cache(100), (req, res) => {
  Pstatement.find({}).exec((err, items) =>
    send(err, items, items => items, req, res)
  );
});

router.get("/pstatement/:id", cache(100), (req, res) => {
  Pstatement.findById(req.params.id).populate('tools').exec((err, result) =>
    send(err, result, result => result, req, res)
  );
});

router.post("/pstatement", (req, res) => {
  new Pstatement(req.body).save((err, result) =>
    send(err, result, result => result, req, res)
  );
});

router.delete("/pstatement/:id", (req, res) => {
  Pstatement.findByIdAndDelete(req.params.id).exec((err, result) =>
    send(err, result, result => result, req, res)
  );
});

router.put("/pstatement/:id", (req, res) => {
  const pstatement = new Pstatement(req.body);
  delete pstatement._id;
  Pstatement.findOneAndUpdate({ description }, pstatement, {
    new: true
  }).exec((err, result) => send(err, result, result => result, req, res));
});

router.patch("/pstatement/:id", (req, res) => {
  Pstatement.findByIdAndUpdate(
    req.params.id,
    { $push: { tools: { $each: [].concat(req.body.tools) } } },
    {
      new: true
    }
  ).exec((err, result) => send(err, result, result => result, req, res));
});

export default router;
