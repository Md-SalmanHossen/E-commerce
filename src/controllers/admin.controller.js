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
    const newAdmin = new adminModel({
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

export const getAdmin = async (req, res) => {
  try {
    let email = req.headers.email;

    let matchStage = {
      $match: { email },
    };

    let project = {
      $project: {
        password: 0,
      },
    };

    let data = await adminModel.aggregate([matchStage, project]);

    res.status(200).json({
      success: true,
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.toString(),
      message: "something went wrong",
    });
  }
};

export const verifyAdmin = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.toString(),
      message: "something went wrong",
    });
  }
};

export const update = async (req, res) => {
  try {
    const { email, password } = req.body;

    const _id = req.headers._id;
    if (!_id) {
      return res.status(400).json({
        success: false,
        message: "User ID missing in headers",
      });
    }

    const user = await adminModel.findById(_id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let updatedData = {};

    if (email && email !== user.email) {
      const emailExists = await adminModel.findOne({ email });

      if (emailExists) {
        return res.status(409).json({
          success: false,
          message: "Email already exists.",
        });
      }
      updatedData.email = email;
    }

    if (password) {
      const hashedPass = await bcrypt.hash(password, 10);
      updatedData.password = hashedPass;
    }

    if (Object.keys(updatedData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Nothing to update",
      });
    }

    const updatedUser = await adminModel.findByIdAndUpdate(_id, updatedData, {
      new: true,
    });

    let token = EncodeToken(updatedUser?.email, updatedUser?._id.toString());

    res.cookie("a_token",token, options);

    res.status(200).json({
      success: true,
      message: "Admin updated successfully",
      user: {
        email: updatedUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.toString(),
      message: "something went wrong",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("a_token");
    res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.toString(),
      message: "something went wrong",
    });
  }
};
