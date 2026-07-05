import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    type: {
      type: String,
      enum: ['order', 'promotion', 'system', 'review', 'offer'],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    data: mongoose.Schema.Types.Mixed,
    isRead: {
      type: Boolean,
      default: false
    },
    readAt: Date
  },
  { timestamps: true }
);

notificationSchema.index({ user: 1 });
notificationSchema.index({ createdAt: -1 });
notificationSchema.index({ isRead: 1 });

export default mongoose.model('Notification', notificationSchema);
