import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    found: { type: Boolean, default: false },
    imageUrl: { type: String }, 
  },
  { timestamps: true } 
);

const Item = mongoose.model("Item", itemSchema);

export default Item;
