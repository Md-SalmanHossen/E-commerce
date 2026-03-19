import { DecodeToken } from "../utility/token-helper.utility";

const adminVerify = (req, res, next) => {
  let token = req.cookies["a_token"];
  let decoded = DecodeToken(token);

  if (decoded === null) {
    return res.status(401).json({
      status: 401,
      message: "Invalid Token",
    });
  }
  let email=decoded['email'];
  let _id=decoded['_id'];

  req.headers.email=_id;
  
  next();
};
export default adminVerify;
