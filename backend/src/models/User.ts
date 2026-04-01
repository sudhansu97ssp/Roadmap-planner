import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  settings: {
    theme: 'dark' | 'light';
    dailyGoalMinutes: number;
    notificationsEnabled: boolean;
    targetCompanies: string[];
    targetDate?: Date;
    weeklyGoalHours: number;
  };
  stats: {
    totalMinutes: number;
    totalSessions: number;
    longestStreak: number;
    currentStreak: number;
    lastStudyDate?: string; // YYYY-MM-DD
    startDate: Date;
  };
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false,
    },
    avatar: {
      type: String,
      default: '',
    },
    settings: {
      theme: { type: String, enum: ['dark', 'light'], default: 'dark' },
      dailyGoalMinutes: { type: Number, default: 120, min: 15, max: 720 },
      notificationsEnabled: { type: Boolean, default: true },
      targetCompanies: { type: [String], default: [] },
      targetDate: { type: Date },
      weeklyGoalHours: { type: Number, default: 14, min: 1, max: 84 },
    },
    stats: {
      totalMinutes: { type: Number, default: 0 },
      totalSessions: { type: Number, default: 0 },
      longestStreak: { type: Number, default: 0 },
      currentStreak: { type: Number, default: 0 },
      lastStudyDate: { type: String, default: '' },
      startDate: { type: Date, default: Date.now },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        delete ret.password;
        return ret;
      },
    },
  }
);

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Indexes
userSchema.index({ email: 1 });

const User = mongoose.model<IUser>('User', userSchema);
export default User;
