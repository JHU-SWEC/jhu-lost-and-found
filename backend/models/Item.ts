import mongoose, { Schema, Document } from "mongoose";

export interface IItem extends Document {
  title: string;
  description: string;
  location: string;
  found: boolean;
  imageUrl?: string; 
  user?: string;
  createdAt?: Date;
}

const ItemSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    location: String,
    found: { type: Boolean, default: false },
    imageUrl: String, 
    user: { type: String, default: "Anonymous" },
  },
  { timestamps: true } 
);

export default mongoose.model<IItem>("Item", ItemSchema);
