import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    label: {
      type: String,
      enum: ['home', 'work', 'other'],
      default: 'other'
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true,
      match: [/^[0-9]{6}$/, 'Invalid pincode']
    },
    latitude: Number,
    longitude: Number,
    isDefault: {
      type: Boolean,
      default: false
    },
    phoneNumber: {
      type: String,
      match: [/^[0-9]{10}$/, 'Invalid phone number']
    }
  },
  { timestamps: true }
);

addressSchema.index({ user: 1 });

export default mongoose.model('Address', addressSchema);
