import Pstatement from "../models/pstatement";
import { send } from "../utils";
import cache from "../utils/cache";

export default app => {
  app.get("/pstatement", cache(100), (req, res) => {
    Pstatement.find({}).exec((err, items) =>
      send(err, items, items => items, req, res)
    );
  });

  app.get("/pstatement/:id", cache(100), (req, res) => {
    Pstatement.findById(req.params.id).populate('tools').exec((err, result) =>
      send(err, result, result => result, req, res)
    );
  });

  app.post("/pstatement", (req, res) => {
    new Pstatement(req.body).save((err, result) =>
      send(err, result, result => result, req, res)
    );
  });

  app.delete("/pstatement/:id", (req, res) => {
    Pstatement.findByIdAndDelete(req.params.id).exec((err, result) =>
      send(err, result, result => result, req, res)
    );
  });

  app.put("/pstatement/:id", (req, res) => {
    const pstatement = new Pstatement(req.body);
    delete pstatement._id;
    Pstatement.findOneAndUpdate({ description }, pstatement, {
      new: true
    }).exec((err, result) => send(err, result, result => result, req, res));
  });

  app.patch("/pstatement/:id", (req, res) => {
    Pstatement.findByIdAndUpdate(
      req.params.id,
      { $push: { tools: { $each: [].concat(req.body.tools) } } },
      {
        new: true
      }
    ).exec((err, result) => send(err, result, result => result, req, res));
  });
};
