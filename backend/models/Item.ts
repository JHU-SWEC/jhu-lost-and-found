import mongoose, { Schema, Document } from 'mongoose';

export interface IItem extends Document {
  title: string;
  description: string;
  found: boolean;
  location: string;
}

const ItemSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  found: { type: Boolean, default: false },
  location: { type: String },
}, { timestamps: true });

export default mongoose.model<IItem>('Item', ItemSchema);
