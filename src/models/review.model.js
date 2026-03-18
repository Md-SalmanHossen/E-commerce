import mongoose from "mongoose";

const DataSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    invoice_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    description: { type: String, required: true },
    ratting: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const reviewModel = mongoose.model("reviews", DataSchema);
export default reviewModel;
