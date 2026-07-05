import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true
    },
    description: String,
    image: String,
    icon: String,
    slug: {
      type: String,
      lowercase: true,
      unique: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    displayOrder: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

categorySchema.index({ slug: 1 });

export default mongoose.model('Category', categorySchema);
