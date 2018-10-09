import express from "express";
import MongoClient from "mongodb";
import bodyParser from "body-parser";
import routes from "./routes";

const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(
  process.env.MONGO_URL,
  (err, client) => {
    if (err) return console.error(err);
    const db = client.db("mitoolbox");
    routes(app, db);
    app.listen(port, () => console.log(`Running on port ${port}`));
  }
);
