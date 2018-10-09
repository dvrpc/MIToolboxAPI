export default (app, db) => {
  const upsert = (collection, selector, document, req, res) => {
    db.collection(collection).update(
      selector,
      document,
      { upsert: true, fullResult: true },
      (err, result) => {
        if (err) {
          res.send({ error: err.toString() });
        } else {
          res.send(result.ops[0]);
        }
      }
    );
  };

  app.get("/word", (req, res) => {
    db.collection("words")
      .find({}, { fields: { name: 1 } })
      .toArray((err, items) => {
        if (err) {
          res.send({ error: err.toString() });
        } else {
          res.send(items.map(item => item.name));
        }
      });
  });

  app.get("/word/:name", (req, res) => {
    db.collection("words").findOne({ name: req.params.name }, (err, item) => {
      if (err) {
        res.send({ error: err.toString() });
      } else {
        res.send(item);
      }
    });
  });

  app.post("/word", (req, res) => {
    upsert(
      "words",
      { name: req.body.name },
      { name: req.body.name, weight: req.body.weight, pstatements: [] },
      req,
      res
    );
  });

  app.delete("/word/:name", (req, res) => {
    db.collection("words").remove({ name: req.params.name }, (err, item) => {
      if (err) {
        res.send({ error: err.toString() });
      } else {
        res.send(`Word ${req.params.name} deleted`);
      }
    });
  });

  app.put("/word/:name", (req, res) => {
    upsert(
      "words",
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
