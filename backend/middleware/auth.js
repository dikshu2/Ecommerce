const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticated = async (req, res, next) => {
  try {
    if (!req.cookie || !req.cookie.token) {
      return res.status(404).json({
        success: false,
        message: "Please login to continue",
      });
    }
    const { token } = req.cookie;
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.authorizedRole= (...roles)=>{
  return (req,res,next)=>{
    if(!roles.includes(req.user.role)){
      return res.status(403).json({
        success:false,
        message:"Access denied",
      });
    }else{
      next();
    }
  };
};
