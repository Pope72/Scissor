import { Schema, model } from "mongoose";
const userSchema = new Schema({
  email: { type: String, required: true, unique:true },
  password: { type: String, required: true },
});

const userModel = model("userModel", userSchema);
export default userModel;
