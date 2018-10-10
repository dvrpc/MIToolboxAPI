import { upsert, send } from "../utils";
import cache from "../utils/cache";
import ObjectID from "mongodb";

export default (app, db) => {
  app.get("/pstatement", cache(100), (req, res) => {
    db.collection("pstatements")
      .find({}, { fields: { description: 1 } })
      .toArray((err, items) => send(err, items, items => items, req, res));
  });

  app.get("/pstatement/:id", cache(100), (req, res) => {
    db.collection("pstatements").findOne(
      { _id: new ObjectID(req.params.id) },
      (err, result) => send(err, result, result => result, req, res)
    );
  });

  app.post("/pstatement", (req, res) => {
    upsert(
      db.collection("pstatements"),
      {},
      {
        $set: {
          description: req.body.description,
          tools: []
        }
      },
      req,
      res
    );
  });

  app.delete("/pstatement/:id", (req, res) => {
    db.collection("pstatements").remove(
      { _id: new ObjectID(req.params.id) },
      (err, result) =>
        send(err, result, () => `pstatement ${req.params.id} deleted`, req, res)
    );
  });

  app.put("/pstatement/:id", (req, res) => {
    const { description, tools } = req.body;
    let fields = {};
    if (description) {
      fields = { ...fields, description };
    }
    if (tools) {
      fields = { ...fields, description };
    }
    upsert(
      db.collection("pstatements"),
      { _id: req.params.id },
      {
        $set: {
          fields
        }
      },
      req,
      res
    );
  });
};
