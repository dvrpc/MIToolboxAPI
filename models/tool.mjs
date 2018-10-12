import mongoose from "../node_modules/mongoose/lib";
import Schema from "../node_modules/mongoose/lib/schema.js"

const toolSchema = new Schema({
  name: String,
  description: String,
  embed: String,
  resources: [{ label: String, href: String }],
  cases: [{ label: String, href: String }],
  models: [{ label: String, href: String }]
});

export default mongoose.model("Tool", toolSchema);
