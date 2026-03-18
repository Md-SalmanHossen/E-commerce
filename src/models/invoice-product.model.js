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
    product_name: { type: String, required: true },
    quantity: { type: Number, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const invoiceProductModel = mongoose.model("product-invoices", DataSchema);
export default invoiceProductModel;
