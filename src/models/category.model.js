import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    category_name: {
      type: String,
      required: true,
      unique: true,
    },
    category_img: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const categoryModel = mongoose.model("categories", DataSchema);
export default categoryModel;
