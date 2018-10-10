import { upsert, send } from "../utils";
import cache from "../utils/cache";
import ObjectID from "mongodb";

export default (app, db) => {
  app.get("/tool", cache(100), (req, res) => {
    db.collection("tools")
      .find({}, { fields: { name: 1 } })
      .toArray((err, items) => send(err, items, items => items, req, res));
  });

  app.get("/tool/:id", cache(100), (req, res) => {
    db.collection("tools").findOne(
      { _id: new ObjectID(req.params.id) },
      (err, result) => send(err, result, result => result, req, res)
    );
  });

  app.post("/tool", (req, res) => {
    upsert(
      db.collection("tools"),
      { _id: new ObjectID(req.body.id) },
      {
        _id: new ObjectID(req.body.id),
        description: req.body.description,
        tools: []
      },
      req,
      res
    );
  });

  app.delete("/tool/:id", (req, res) => {
    db.collection("tools").remove(
      { _id: new ObjectID(req.params.id) },
      (err, result) =>
        send(err, result, () => `tool ${req.params.id} deleted`, req, res)
    );
  });

  app.put("/tool/:id", (req, res) => {
    upsert(
      db.collection("tools"),
      { _id: new ObjectID(req.params.id) },
      {
        _id: new ObjectID(req.body.id),
        description: req.body.description,
        tools: req.body.tools || []
      },
      req,
      res
    );
  });
};
