import productsModel from "../models/product.model.js";

export const createProduct = async (req, res) => {
  try {
    const {
      title,
      images,
      sort_description,
      price,
      isDiscount,
      discount_price,
      remark,
      stock,
      color,
      size,
      description,
      category_id,
      brand_id,
    } = req.body;

    if(discount_price>price){
      return res.status(400).json({
         success:false,
         message:'The discount price must be smaller than main price'
      });
    }

    let data=await productsModel.create({
      title,
      images,
      sort_description,
      price,
      isDiscount,
      discount_price,
      remark,
      stock,
      color,
      size,
      description,
      category_id,
      brand_id,
    });

    res.status(201).json({
      success:true,
      message:'Product created successfully',
      data
    })


  } catch (error) {
    res.status(500).json({
      message: "Server external error",
      error: error.toString(),
    });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    
  } catch (error) {
    res.status(500).json({
      message: "Server external error",
      error: error.toString(),
    });
  }
};

