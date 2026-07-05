import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true
    },
    description: String,
    discountType: {
      type: String,
      enum: ['percentage', 'fixed'],
      required: true
    },
    discountValue: {
      type: Number,
      required: true,
      min: 0
    },
    minimumOrderValue: {
      type: Number,
      default: 0
    },
    maximumDiscount: Number,
    usageLimit: Number,
    usedCount: {
      type: Number,
      default: 0
    },
    usedBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    validFrom: {
      type: Date,
      required: true
    },
    validUntil: {
      type: Date,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    applicableRestaurants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant'
    }],
    applicableCategories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    }]
  },
  { timestamps: true }
);

couponSchema.index({ code: 1 });
couponSchema.index({ validUntil: 1 });

export default mongoose.model('Coupon', couponSchema);
