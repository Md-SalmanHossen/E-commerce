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

export const verifyUser = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
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
    const {
      email,
      password,
      customer_name,
      customer_address,
      customer_city,
      customer_country,
      customer_fax,
      customer_phone,
      customer_postcode,
      customer_state,
      shipping_name,
      shipping_address,
      shipping_city,
      shipping_country,
      shipping_phone,
      shipping_postcode,
      shipping_state
    } = req.body;

    const _id = req.headers._id;
    if (!_id) {
      return res.status(400).json({
        success: false,
        message: "User Id missing",
      });
    }

    const user = await userModel.findById(_id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let updateData = {};

    if (customer_name !== undefined) updateData.customer_name = customer_name;
    if (customer_address !== undefined) updateData.customer_address = customer_address;
    if (customer_city !== undefined) updateData.customer_city = customer_city;
    if (customer_country !== undefined) updateData.customer_country = customer_country;
    if (customer_fax !== undefined) updateData.customer_fax = customer_fax;
    if (customer_phone !== undefined) updateData.customer_phone = customer_phone;
    if (customer_postcode !== undefined) updateData.customer_postcode = customer_postcode;
    if (customer_state !== undefined) updateData.customer_state = customer_state;

    if (shipping_name !== undefined) updateData.shipping_name = shipping_name;
    if (shipping_address !== undefined) updateData.shipping_address = shipping_address;
    if (shipping_city !== undefined) updateData.shipping_city = shipping_city;
    if (shipping_country !== undefined) updateData.shipping_country = shipping_country;
    if (shipping_phone !== undefined) updateData.shipping_phone = shipping_phone;
    if (shipping_postcode !== undefined) updateData.shipping_postcode = shipping_postcode;
    if (shipping_state !== undefined) updateData.shipping_state = shipping_state;
    
    
    if (email && email !== user.email) {
    const emailExists = await userModel.findOne({ email });

      if (emailExists && emailExists._id.toString() !== _id.toString()) {
        return res.status(409).json({
          success: false,
          message: "Email already exists",
        });
      }

      updateData.email = email;
    }

    if (password) {
      const isSamePass = await bcrypt.compare(password, user.password);
      if (!isSamePass) {
        updateData.password = await bcrypt.hash(password, 10);
      }
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Nothing to update",
      });
    }

    const updateUserField = await userModel.findByIdAndUpdate(_id, updateData, {
      new: true,
    });

    if (!updateUserField) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (email || password) {
      let token = EncodeToken(
        updateUserField.email,
        updateUserField._id.toString(),
      );

      res.cookie("u_token", token, options);
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: {
        email: updateUserField.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("u_token");
    res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.toString(),
    });
  }
};
