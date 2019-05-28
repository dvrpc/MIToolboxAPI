import mongoose from "../node_modules/mongoose/lib";
import Schema from "../node_modules/mongoose/lib/schema.js";

const toolSchema = new Schema({
  name: String,
  description: String,
  categories: [String],
  resources: [{ label: String, href: String }],
  case_studies: [{ label: String, href: String }],
  ordinances: [{ label: String, href: String }],
  relatedTools: [{ type: Schema.Types.ObjectId, ref: "Tool" }]
});

export default mongoose.model("Tool", toolSchema);
