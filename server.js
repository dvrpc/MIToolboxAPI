import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import routes from "./routes";

const port = process.env.PORT || 3000;
const app = express();

mongoose.connect(process.env.MONGO_URL, {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
});
mongoose.set("debug", true);

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/mitoolbox", routes);

app.listen(port, () => console.log(`Running on port ${port}`));
