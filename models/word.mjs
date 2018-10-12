import mongoose from "../node_modules/mongoose/lib";
import Schema from "../node_modules/mongoose/lib/schema.js"
import ObjectId from "../node_modules/mongoose/lib/schema/objectid"

const wordSchema = new Schema({
  name: String,
  weight: Number, 
  pstatements: [{ type: ObjectId, ref: "Pstatement" }]
});

export default mongoose.model("Word", wordSchema);
