import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food'
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant'
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: [true, 'Comment is required']
    },
    images: [String],
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    replies: [
      {
        user: mongoose.Schema.Types.ObjectId,
        name: String,
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    isVerifiedPurchase: {
      type: Boolean,
      default: false
    },
    helpfulCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

reviewSchema.index({ food: 1 });
reviewSchema.index({ restaurant: 1 });
reviewSchema.index({ user: 1 });
reviewSchema.index({ rating: -1 });
reviewSchema.index({ createdAt: -1 });

export default mongoose.model('Review', reviewSchema);
