import User from "../models/UserModel.js";

export const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};