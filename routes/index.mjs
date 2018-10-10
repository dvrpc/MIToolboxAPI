import wordRoutes from "./word";
import pstatementRoutes from "./pstatement";
import toolRoutes from "./tool";

export default (app, db) => {
  wordRoutes(app, db);
  pstatementRoutes(app, db);
  toolRoutes(app, db);
};
