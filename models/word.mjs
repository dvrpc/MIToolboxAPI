import mongoose from "../node_modules/mongoose/lib";
import Schema from "../node_modules/mongoose/lib/schema.js"

const wordSchema = new Schema({
  name: String,
  weight: Number, 
  pstatements: [{ type: String, ref: "Pstatement" }]
});

export default mongoose.model("Word", wordSchema);
