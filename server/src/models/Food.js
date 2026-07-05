import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Food name is required'],
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative']
    },
    offerPrice: {
      type: Number,
      min: [0, 'Offer price cannot be negative']
    },
    discount: Number,
    isVeg: {
      type: Boolean,
      default: true
    },
    ingredients: [String],
    calories: Number,
    preparationTime: {
      type: Number,
      default: 20
    },
    spiceLevel: {
      type: String,
      enum: ['mild', 'medium', 'hot'],
      default: 'mild'
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    isBestSeller: {
      type: Boolean,
      default: false
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
    orderCount: {
      type: Number,
      default: 0
    },
    tags: [String]
  },
  { timestamps: true }
);

foodSchema.index({ name: 'text', description: 'text' });
foodSchema.index({ restaurant: 1 });
foodSchema.index({ category: 1 });
foodSchema.index({ isVeg: 1 });
foodSchema.index({ price: 1 });
foodSchema.index({ rating: -1 });
foodSchema.index({ isBestSeller: 1 });

export default mongoose.model('Food', foodSchema);
