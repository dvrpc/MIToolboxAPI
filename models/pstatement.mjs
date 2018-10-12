import mongoose from "../node_modules/mongoose/lib";
import Schema from "../node_modules/mongoose/lib/schema.js"
import ObjectId from "../node_modules/mongoose/lib/schema/objectid"

const pstatementSchema = new Schema({
  description: String,
  tools: [{ type: ObjectId, ref: "Tool" }]
});

export default mongoose.model("Pstatement", pstatementSchema);
