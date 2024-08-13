import JWT from "jsonwebtoken";
import userModel from "../schemas/user.js";
import express from "express";
import cookieParser from "cookie-parser";
const protectedRouting = async (req, res, next) => {
  try {
    const { RefreshToken, AccessToken } = req.cookies;
    if (!RefreshToken)
      return res.status(401).json({ error: "Sign in to use ChatFusion" });
    if (AccessToken) {
      const decoded = JWT.verify(AccessToken, process.env.JWTSECRET);
      if (!decoded)
        return res
          .status(401)
          .json({ error: "Please sign in to use ChatFusion" });
      const user = await userModel.findById(decoded.data1).select("-password");
      req.user = user;
      next();
    } else {
      const decoded = JWT.verify(RefreshToken, process.env.JWTSECRET);
      if (!decoded)
        return res.statue(401).json({ error: "Sign in to use Scissor" });
      const accessToken = JWT.sign(
        {
          data1: decoded.data1,
          data2: decoded.data2,
        },
        process.env.JWTSECRET,
        { expiresIn: 60 * 1000 }
      );
      res.cookie("AccessToken", accessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: "true",
        maxAge: 60 * 1000,
      });
      const user = await userModel.findById(decoded.data1).select("-password");
      req.user = user;
      next();
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export default protectedRouting;
