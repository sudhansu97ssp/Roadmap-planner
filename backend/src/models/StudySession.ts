import mongoose, { Document, Schema } from 'mongoose';

export type SessionModule =
  | 'dsa'
  | 'cs'
  | 'sd'
  | 'java'
  | 'react'
  | 'node'
  | 'beh'
  | 'mock'
  | 'next'
  | 'express'
  | 'cicd'
  | 'aiml'
  | 'cloud';

export type DifficultyLevel = 'E' | 'M' | 'H' | '';
export type Outcome = 'solved' | 'hint' | 'watched' | 'theory' | 'mock' | 'review';

export interface IStudySession extends Document {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  topic: string;
  module: SessionModule;
  durationMinutes: number;
  difficulty: DifficultyLevel;
  outcome: Outcome;
  notes: string;
  date: string; // YYYY-MM-DD
  createdAt: Date;
  updatedAt: Date;
}

const studySessionSchema = new Schema<IStudySession>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    topic: {
      type: String,
      required: [true, 'Topic is required'],
      trim: true,
      maxlength: [200, 'Topic cannot exceed 200 characters'],
    },
    module: {
      type: String,
      required: [true, 'Module is required'],
      enum: ['dsa', 'cs', 'sd', 'java', 'react', 'node', 'beh', 'mock', 'next', 'express', 'cicd', 'aiml', 'cloud'],
    },
    durationMinutes: {
      type: Number,
      required: [true, 'Duration is required'],
      min: [1, 'Duration must be at least 1 minute'],
      max: [480, 'Duration cannot exceed 480 minutes'],
    },
    difficulty: {
      type: String,
      enum: ['E', 'M', 'H', ''],
      default: '',
    },
    outcome: {
      type: String,
      required: [true, 'Outcome is required'],
      enum: ['solved', 'hint', 'watched', 'theory', 'mock', 'review'],
      default: 'solved',
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [1000, 'Notes cannot exceed 1000 characters'],
      default: '',
    },
    date: {
      type: String,
      required: true,
      match: [/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'],
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient user+date queries
studySessionSchema.index({ user: 1, date: -1 });
studySessionSchema.index({ user: 1, module: 1 });
studySessionSchema.index({ user: 1, createdAt: -1 });

const StudySession = mongoose.model<IStudySession>('StudySession', studySessionSchema);
export default StudySession;
