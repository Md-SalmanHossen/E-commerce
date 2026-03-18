import mongoose from "mongoose";

const DataSchema = new mongoose.Schema(
  {
    file_name: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const fileModel = mongoose.model("files", DataSchema);
export default fileModel;
