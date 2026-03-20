import { DecodeToken } from "../utility/token-helper.utility.js";

const userVerify = (req, res, next) => {
  let token = req.cookies["u_token"];
  if (!token) {
    return res.status(401).json({
      status: 401, 
      message: "Token missing" 
    });
  }

  let decoded = DecodeToken(token);
  if (!decoded) {
    return res.status(401).json({
      status: 401, 
      message: "Invalid Token" 
   });
  }

  if (decoded === null) {
    return res.status(401).json({
      status: 401,
      message: "Invalid Token",
    });
  }

  let email = decoded["email"];
  let _id = decoded["_id"];

  req.headers.email = email;
  req.headers._id = _id;

  next();
};
export default userVerify;
