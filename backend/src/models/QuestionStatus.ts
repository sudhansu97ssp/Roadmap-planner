import mongoose, { Document, Schema } from 'mongoose';

export type QStatus = 'unsolved' | 'solved' | 'attempted' | 'revision';

// SM-2 spaced repetition fields
export interface IQuestionStatus extends Document {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  questionId: string; // external question id (from data layer, e.g. "d1", "j3")
  status: QStatus;
  solvedCount: number;
  lastSolvedAt?: Date;
  // SM-2 spaced repetition
  repetitions: number;
  easeFactor: number;    // default 2.5
  interval: number;      // days until next review
  nextReviewDate?: string; // YYYY-MM-DD
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const questionStatusSchema = new Schema<IQuestionStatus>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    questionId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['unsolved', 'solved', 'attempted', 'revision'],
      default: 'unsolved',
    },
    solvedCount: {
      type: Number,
      default: 0,
    },
    lastSolvedAt: {
      type: Date,
    },
    repetitions: { type: Number, default: 0 },
    easeFactor: { type: Number, default: 2.5 },
    interval: { type: Number, default: 1 },
    nextReviewDate: { type: String, default: '' },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, 'Notes cannot exceed 500 characters'],
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Unique constraint: one status entry per user per question
questionStatusSchema.index({ user: 1, questionId: 1 }, { unique: true });
questionStatusSchema.index({ user: 1, status: 1 });
questionStatusSchema.index({ user: 1, nextReviewDate: 1 });

const QuestionStatus = mongoose.model<IQuestionStatus>('QuestionStatus', questionStatusSchema);
export default QuestionStatus;
