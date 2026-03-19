import jwt from "jsonwebtoken";

export const EncodeToken = () => {
  let key = process.env.JWT_KEY;
  let expire = process.env.Expire_Time;

  let payload = { email, _id };
  return jwt.sign(payload, key, { expiresIn: expire });
};

export const DecodeToken = (token) => {
  try {
    let key = process.env.JWT_KEY;
    let decoded = jwt.verify(token, key);
    return decoded;
  } catch (error) {
    return null;
  }
};
