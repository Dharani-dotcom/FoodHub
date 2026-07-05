import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant'
    },
    items: [
      {
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Food',
          required: true
        },
        name: String,
        price: Number,
        quantity: {
          type: Number,
          required: true,
          min: 1
        },
        specialInstructions: String,
        addedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    subtotal: {
      type: Number,
      default: 0
    },
    couponCode: String,
    discount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

cartSchema.index({ customer: 1 });

export default mongoose.model('Cart', cartSchema);
