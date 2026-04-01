import mongoose, { Document, Schema } from 'mongoose';

export interface IDailyLog extends Document {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  date: string; // YYYY-MM-DD
  totalMinutes: number;
  sessionCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const dailyLogSchema = new Schema<IDailyLog>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: String,
      required: true,
      match: [/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'],
    },
    totalMinutes: {
      type: Number,
      default: 0,
      min: 0,
    },
    sessionCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

dailyLogSchema.index({ user: 1, date: 1 }, { unique: true });
dailyLogSchema.index({ user: 1, date: -1 });

const DailyLog = mongoose.model<IDailyLog>('DailyLog', dailyLogSchema);
export default DailyLog;
