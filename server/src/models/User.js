import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false
    },
    phone: {
      type: String,
      match: [/^[0-9]{10}$/, 'Please provide a valid phone number']
    },
    avatar: {
      type: String,
      default: null
    },
    role: {
      type: String,
      enum: ['customer', 'admin', 'restaurant_owner'],
      default: 'customer'
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    emailVerificationToken: String,
    emailVerificationExpires: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    isActive: {
      type: Boolean,
      default: true
    },
    addresses: [
      {
        _id: mongoose.Schema.Types.ObjectId,
        label: String,
        address: String,
        city: String,
        state: String,
        pincode: String,
        isDefault: Boolean
      }
    ],
    preferences: {
      notifications: { type: Boolean, default: true },
      darkMode: { type: Boolean, default: false }
    },
    loyaltyPoints: {
      type: Number,
      default: 0
    },
    referralCode: String,
    referredBy: mongoose.Schema.Types.ObjectId,
    totalOrders: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 }
  },
  { timestamps: true }
);

// Index for faster queries
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
userSchema.index({ role: 1 });

export default mongoose.model('User', userSchema);
