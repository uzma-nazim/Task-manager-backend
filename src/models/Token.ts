import mongoose, { Schema } from 'mongoose';
import { TokenDocument } from '../types';

const tokenSchema = new Schema<TokenDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 30 * 24 * 60 * 60 // 30 days in seconds
  }
});

export default mongoose.model<TokenDocument>('Token', tokenSchema); 