const User = require("../models/userModel");

exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      profile_pic: {
        public_id: "default",
        url: "default",
      },
    });
    return res.status(200).json({
      message: "User Registered",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.json({
      sucess: false,
      message: "Invalid Credentials",
    });
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return res.json({
      sucess: false,
      message: "Invalid Credentials",
    });
  }
  const token = user.getToken();
  res.cookie("token", token, {
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  });

  return res.status(200).json({
    sucess: true,
    user,
  });
};

exports.logout = (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  return res.status(200).json({
    sucess: true,
    message: "User Logged out ",
  });
};

exports.getUserDetails = async (req, res, next)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user,
    });
};

exports.updateProfile = async(req, res, next)=>{
    const newUserData ={
        name: req.body.name,
        email: req.body.email,
    };

    const user = await user.findByIdAndUpdate(req.user.id, newUserData,{
        new: true,
        runValidators:true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        user,
    });
};

exports.getAllUsers = async(req,res,next)=>{
    const user = await User.find();
    res.status(200).json({
        success: true,
        user,
    });
};

exports.updateUserRole = async(req,res,next)=>{
    const newUserData ={
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };

    const user = await user.findByIdAndUpdate(req.params.id, newUserData,{
        new: true,
        runValidators:true,
        useFindAndModify: false,
    });
};
exports.deleteUser = async (req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
      return  res.status(404).json({
            success: false,
            message:"user id deleted",
        });
    }
    await user.remove();
    res.status(200).json({
        success: true,
        message:"User is deleted",
    });
};