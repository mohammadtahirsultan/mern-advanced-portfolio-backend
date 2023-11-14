
import jwt from "jsonwebtoken";
const setCookie = async (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN_SECRET);
  res
    .status(statusCode)
    .cookie("janu", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      // sameSite: "none",
      // secure: true,
    })
    .json({
      success: true,
      message,
      user,
    });
};


export default setCookie;
