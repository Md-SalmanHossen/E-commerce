import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    title: {type: String},
    images: {type: String},
    sort_description: {type: String},
    price: {type: Number},
    isDiscount: {type: Boolean},
    discount_price: {type: Number},
    remark:{type:String},
    stock:{type:Number},
    color:[String],
    size:[Number],
    description:{type:String},

    category_id:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
    },
    brand_id:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const productsModel = mongoose.model("products", DataSchema);
export default productsModel;
