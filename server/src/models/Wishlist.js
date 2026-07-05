import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    foods: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food'
      }
    ],
    restaurants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
      }
    ]
  },
  { timestamps: true }
);

wishlistSchema.index({ customer: 1 });

export default mongoose.model('Wishlist', wishlistSchema);
