import mongoose from "../node_modules/mongoose/lib";
import Schema from "../node_modules/mongoose/lib/schema.js"

const pstatementSchema = new Schema({
  description: String,
  tools: [{ type: String, ref: "Tool" }]
});

export default mongoose.model("Pstatement", pstatementSchema);
