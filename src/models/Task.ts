import mongoose, { Schema } from 'mongoose';
import { TaskDocument } from '../types';

const taskSchema = new Schema<TaskDocument>({
  title: {
    type: String,
    required: [true, 'Please provide a task title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  checklistItems: [{
    id: {
      type: String,
    
    },
    text: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    }
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<TaskDocument>('Task', taskSchema); 