import dotenv from "dotenv";
import User from "../models/auth.js";
// import redis from "../redis.js";
dotenv.config();


export const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "300", 10);
  const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || "1200", 10);

  // Cookies
  export const accessTokenOptions = {
    expires: new Date(Date.now() + accessTokenExpire *60*60 * 1000),
    maxAge: accessTokenExpire*60*60*   1000,
    httpOnly: true,
    sameSite: "lax",
  };
  export  const refreshTokenOptions = {
    expires: new Date(Date.now() + refreshTokenExpire *60*60* 1000),
    maxAge: refreshTokenExpire*60*60*   1000,
    httpOnly: true,
    sameSite: "lax",
  };

  // Only set secure to true in production
  if (process.env.NODE_ENV === "production") {
    accessTokenOptions.secure = true;
  }
export const sendToken = (user, req, res, next) => {
  const accessToken = user.signAccessToken();
  const refreshToken = user.signRefreshToken();

  // Save user data to Redis
  // redis.set(user._id.toString(), JSON.stringify(user));

  

  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);

  res.status(201).json({
    success: true,
    user,
    access_token: accessToken, // Corrected property name
  });
};