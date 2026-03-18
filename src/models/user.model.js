import mongoose from "mongoose";
import bcrypt, { hash } from "bcrypt";

const DataSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    customer_name: { type: String },
    customer_address: { type: String },
    customer_city: { type: String },
    customer_country: { type: String },
    customer_fax: { type: String },
    customer_phone: { type: String },
    customer_postcode: { type: String },
    customer_state: { type: String },

    shipping_name:{type:String},
    shipping_address:{type:String},
    shipping_city:{type:String},
    shipping_country:{type:String},
    shipping_phone:{type:String},
    shipping_postcode:{type:String},
    shipping_state:{type:String},
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

DataSchema.pre("save", async (next) => {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await hash(this.password, 10);
  next();
});

const userModel = mongoose.model("users", DataSchema);
export default userModel;
