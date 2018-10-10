import { upsert, send } from "../utils";
import cache from "../utils/cache";

export default (app, db) => {
  app.get("/word", cache(100), (req, res) => {
    db.collection("words")
      .find({}, { fields: { name: 1 } })
      .toArray((err, items) =>
        send(err, items, items => items.map(item => item.name), req, res)
      );
  });

  app.get("/word/:name", cache(100), (req, res) => {
    db.collection("words").findOne({ name: req.params.name }, (err, result) =>
      send(err, result, result => result, req, res)
    );
  });

  app.post("/word", (req, res) => {
    upsert(
      db.collection("words"),
      { name: req.body.name },
      { name: req.body.name, weight: req.body.weight, pstatements: [] },
      req,
      res
    );
  });

  app.delete("/word/:name", (req, res) => {
    db.collection("words").remove({ name: req.params.name }, (err, result) =>
      send(err, result, () => `Word ${req.params.name} deleted`, req, res)
    );
  });

  app.put("/word/:name", (req, res) => {
    upsert(
      db.collection("words"),
      { name: req.params.name },
      {
        name: req.body.name,
        weight: req.body.weight,
        pstatements: req.body.pstatements || []
      },
      req,
      res
    );
  });
};
