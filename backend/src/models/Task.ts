import { Schema, model, Types, type InferSchemaType } from 'mongoose';

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    description: {
      type: String,
      default: '',
      trim: true,
      maxlength: 1000
    },
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending'
    },
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    }
  },
  { timestamps: true }
);

taskSchema.index({ userId: 1, status: 1, createdAt: -1 });

export type TaskDocument = InferSchemaType<typeof taskSchema>;
export const Task = model('Task', taskSchema);
