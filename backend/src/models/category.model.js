import mongoose, { Schema } from "mongoose";

// Define the Category Schema
const categorySchema = new Schema(
  {
    _id: {
      type: String, 
      required: true
    },
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name can be up to 50 characters"]
    },
    description: {
      type: String,
      trim: true,
      maxlength: [250, "Description can be up to 250 characters"]
    }
  },
  {
    timestamps: true, 
  }
);


export const Category = mongoose.model("Category", categorySchema);
