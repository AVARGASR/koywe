import { Schema } from 'mongoose';

export const MongoUserSchema = new Schema({
  _id: { type: String },
  username: { type: String, unique: true },
  password: { type: String, select: false },
});
