import mongoose from "../node_modules/mongoose/lib";
import Schema from "../node_modules/mongoose/lib/schema.js"

const sectionSchema = new Schema({
  description: String,
  category: String,
  tools: [{ type: String, ref: "Tool" }]
});

export default mongoose.model("Section", sectionSchema);
