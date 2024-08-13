import { Schema, model } from "mongoose";
const linkSchema = new Schema({
  linkOwner: { type: Schema.Types.ObjectId, ref: "userModel", required: true },
  originalLink: { type: String, required: true },
  shortenedLink: { type: String, required: true, unique: true },
  clicks: [{ count: Number, country: String }],
  qrCodeUrl: { type: String, required: true },
});
const linkModel = model("linkModel", linkSchema);
export default linkModel;
