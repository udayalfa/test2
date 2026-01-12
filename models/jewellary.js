import mongoose from "mongoose";

const jewellerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // removes extra spaces
  },
  shortDescription: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Necklace",
      "Ring",
      "Earring",
      "Bracelet",
      "Anklet",
      "Pendant",
      "Chain",
      "Other",
    ],
  },
  gender: {
    type: String,
    enum: ["Men", "Women"],
    required: true,
  },
  metalType: {
    type: String,
    enum: ["Gold", "Silver", "Platinum", "Diamond", "Artificial", "Other"],
    required: true,
  },
  purity: {
    type: String, // e.g. "22K", "18K", "925 Silver"
    enum: ["22K", "18K", "925 Silver"],
    required: true,
  },
  weight: {
    type: Number, // "15g", "10.5g" etc
  },
  stoneType: {
    type: String,
    enum: ["Diamond", "Ruby", "Emerald", "Kundan", "Others"], // "Diamond", "Ruby", "Emerald", etc.
  },
  images: {
    type: [String], // store image URLs (from Cloudinary or other)
    required: true,
  },
  stock: {
    type: Number,
    default: 1, // optional (if you want to track stock)
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Jewellery = mongoose.model("Jewellery", jewellerySchema);

export default Jewellery;
