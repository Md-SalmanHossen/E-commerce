import adminModel from "../models/admin.model.js";
import  bcrypt  from 'bcrypt';

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

     if(!email || !password){
       return res.status(400).json({
          success:false,
          message:'Email and password required'
       });
     }

    const findUser = await adminModel.findOne({ email });
    if (findUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.! Try new email",
      });
    }

    const hashedPass = await bcrypt.hash(password,10);

    const newAdmin = adminModel({ 
      email, 
      password:hashedPass
    });
    await newAdmin.save();

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.toString(),
      message: "something went wrong",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.toString(),
      message: "something went wrong",
    });
  }
};
