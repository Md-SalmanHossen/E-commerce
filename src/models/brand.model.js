import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    brand_name: {
      type: String,
      required: true,
      unique: true,
    },
    brand_img: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const brandModel = mongoose.model("brands", DataSchema);
export default brandModel;
