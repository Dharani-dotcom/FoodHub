import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true
    },
    totalOrders: {
      type: Number,
      default: 0
    },
    totalRevenue: {
      type: Number,
      default: 0
    },
    totalCustomers: {
      type: Number,
      default: 0
    },
    totalRestaurants: {
      type: Number,
      default: 0
    },
    averageOrderValue: {
      type: Number,
      default: 0
    },
    topFoods: [{
      food: mongoose.Schema.Types.ObjectId,
      orders: Number,
      revenue: Number
    }],
    topRestaurants: [{
      restaurant: mongoose.Schema.Types.ObjectId,
      orders: Number,
      revenue: Number
    }],
    ordersByStatus: {
      pending: Number,
      accepted: Number,
      preparing: Number,
      packed: Number,
      out_for_delivery: Number,
      delivered: Number,
      cancelled: Number
    },
    paymentMethods: {
      cod: Number,
      card: Number,
      upi: Number,
      wallet: Number
    }
  },
  { timestamps: true }
);

analyticsSchema.index({ date: -1 });

export default mongoose.model('Analytics', analyticsSchema);
