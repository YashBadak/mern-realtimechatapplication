const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if token exists in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await userModel.findById(decoded.id).select("-password");
      return next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, Token Failed");
    }
  }

  // If no token found
  res.status(401);
  throw new Error("Not Authorized, No Token");
});

module.exports = protect;
