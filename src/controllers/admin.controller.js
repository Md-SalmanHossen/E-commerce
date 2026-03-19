import adminModel from "../models/admin.model.js";
import bcrypt from "bcrypt";
import { EncodeToken } from "./../utility/token-helper.utility.js";

let options = {
  maxAge: process.env.Cookie_Expire_Time,
  httpOnly: false,
  sameSite: "none",
  secure: true,
};

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    const findUser = await adminModel.findOne({ email });
    if (findUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.! Try new email",
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newAdmin =new adminModel({
      email,
      password: hashedPass,
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

    if (!email || !password) {
      return res.status(400).json({
        status: "false",
        message: "All fields are required",
      });
    }

    const user = await adminModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatchedPass = await bcrypt.compare(password, user.password);
    if (!isMatchedPass) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    let token = EncodeToken(user.email, user._id.toString());

    res.cookie("a_token", token, options);
    res.status(200).json({
      success: true,
      message: "Login successfully",
      user: {
        id: user._id,
        email: user.email,
      },
      token: token,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.toString(),
      message: "something went wrong",
    });
  }
};
