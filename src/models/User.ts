import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserDocument } from '../types';

const userSchema = new Schema<UserDocument>({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [20, 'Username cannot be more than 20 characters']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save hook to hash password
userSchema.pre('save', async function (next) {
  try {
    const user = this;
    if (user.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(this.password, salt);
    }

    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.isPasswordMatch = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model<UserDocument>('User', userSchema); 