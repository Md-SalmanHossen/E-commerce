import mongoose from "mongoose";

const DataSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    payable: { type: String, required: true },
    customer_details: { type: Array, required: true },
    ship_details: { type: Array, required: true },
    transaction_id: { type: String, required: true },
    validation_id: { type: String, required: true },
    delivery_status: {
      type: String,
      required: true,
      enum: ["pending", "delivered", "cancel"],
      default: "pending",
    },
    payment_status: {
      type: String,
      required: true,
      enum: ["pending", "success", "cancel", "fail"],
      default: "pending",
    },
    vat: { type: String, required: true },
    total: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const invoiceModel = mongoose.model("invoices", DataSchema);
export default invoiceModel;
