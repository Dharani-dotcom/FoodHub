import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      default: () => `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true
    },
    items: [
      {
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Food'
        },
        name: String,
        price: Number,
        quantity: {
          type: Number,
          required: true,
          min: 1
        },
        specialInstructions: String
      }
    ],
    subtotal: {
      type: Number,
      required: true,
      min: 0
    },
    tax: {
      type: Number,
      default: 0,
      min: 0
    },
    deliveryCharge: {
      type: Number,
      default: 0,
      min: 0
    },
    discount: {
      type: Number,
      default: 0,
      min: 0
    },
    couponCode: String,
    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },
    deliveryAddress: {
      address: String,
      city: String,
      state: String,
      pincode: String,
      latitude: Number,
      longitude: Number
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'preparing', 'packed', 'out_for_delivery', 'delivered', 'cancelled'],
      default: 'pending'
    },
    paymentMethod: {
      type: String,
      enum: ['cod', 'card', 'upi', 'wallet'],
      default: 'cod'
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    },
    transactionId: String,
    deliveryAgentId: mongoose.Schema.Types.ObjectId,
    estimatedDeliveryTime: Date,
    actualDeliveryTime: Date,
    cancellationReason: String,
    cancelledBy: {
      type: String,
      enum: ['customer', 'restaurant', 'admin']
    },
    notes: String,
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    review: String,
    isRated: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

orderSchema.index({ customer: 1 });
orderSchema.index({ restaurant: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ orderId: 1 });

export default mongoose.model('Order', orderSchema);
