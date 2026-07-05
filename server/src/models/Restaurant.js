import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Restaurant name is required'],
      unique: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    logo: String,
    banner: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
      country: String,
      latitude: Number,
      longitude: Number
    },
    phone: {
      type: String,
      match: [/^[0-9]{10}$/, 'Invalid phone number']
    },
    email: {
      type: String,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email']
    },
    website: String,
    cuisines: [String],
    deliveryTime: {
      type: Number,
      default: 30
    },
    deliveryCharge: {
      type: Number,
      default: 0
    },
    minimumOrderValue: {
      type: Number,
      default: 0
    },
    openingHours: {
      monday: { opens: String, closes: String },
      tuesday: { opens: String, closes: String },
      wednesday: { opens: String, closes: String },
      thursday: { opens: String, closes: String },
      friday: { opens: String, closes: String },
      saturday: { opens: String, closes: String },
      sunday: { opens: String, closes: String }
    },
    isOpen: {
      type: Boolean,
      default: true
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalReviews: {
      type: Number,
      default: 0
    },
    totalOrders: {
      type: Number,
      default: 0
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    },
    categories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    }],
    followers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    orders: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    }]
  },
  { timestamps: true }
);

restaurantSchema.index({ name: 1 });
restaurantSchema.index({ 'address.city': 1 });
restaurantSchema.index({ rating: -1 });
restaurantSchema.index({ 'address.latitude': '2dsphere', 'address.longitude': '2dsphere' });

export default mongoose.model('Restaurant', restaurantSchema);
