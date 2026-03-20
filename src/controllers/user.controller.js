import bcrypt from "bcrypt";
import { EncodeToken } from "./../utility/token-helper.utility.js";
import userModel from "./../models/user.model.js";

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
        message: "All fields are require.",
      });
    }

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists. Try another email",
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newAdmin = new userModel({
      email,
      password: hashedPass,
    });
    await newAdmin.save();

    res.status(201).json({
      success: true,
      message: "Registration successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.toString(),
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

    const user = await userModel.findOne({ email });
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

    res.cookie("u_token", token, options);
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

export const getUser = async (req, res) => {
  try {
    let email = req.headers.email;

    if (!email) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let matchStage = {
      $match: { email },
    };

    let project = {
      $project: {
        password: 0,
      },
    };
    let userData = await userModel.aggregate([matchStage, project]);

    res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.toString(),
    });
  }
};

export const update = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.toString(),
    });
  }
};

export const logout = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.toString(),
    });
  }
};
