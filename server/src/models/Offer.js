import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: String,
    image: String,
    type: {
      type: String,
      enum: ['restaurant', 'food', 'category', 'general'],
      required: true
    },
    discountType: {
      type: String,
      enum: ['percentage', 'fixed'],
      required: true
    },
    discountValue: {
      type: Number,
      required: true
    },
    minimumOrderValue: Number,
    maximumDiscount: Number,
    applicableRestaurants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant'
    }],
    applicableFoods: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food'
    }],
    applicableCategories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    }],
    validFrom: {
      type: Date,
      required: true
    },
    validUntil: {
      type: Date,
      required: true
    },
    usageLimit: Number,
    usedCount: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    },
    priority: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

offerSchema.index({ validUntil: 1 });
offerSchema.index({ isActive: 1 });
offerSchema.index({ priority: -1 });

export default mongoose.model('Offer', offerSchema);
