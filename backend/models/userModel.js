const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({   
     name:{
        type: String,
        required: [true, "Please enter your name"],
        minlength: 2,
    },
    email:{
        type: String,
        required: [true, "Please enter your email"],
        validator:[validator.email, "Please enter a valid email"],
        unique: true,
    },
    profile_pic:[
        {
            public_id:{
                type: String,
                required:true,
            },
            
                url:{
                    type: String,
                    required:true,
                },
            },
    ],
    password:{
        type: String,
        require:[true, "Please Enter your password"],
        minlength: [8, "Password must be greater than 8 character"],
        
    },
   role:{
    type: String,
    default: "user",
   },

});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
this.password= await bcrypt.hash(this.password,10);
});

userSchema.methods.comparePassword = async function(enteredPassword){
return await bcrypt.compare(enteredPassword,this.password);
};

userSchema.methods.getToken=  function(){
const token = jwt.sign({id:this._id}, "secretKey",{
    expiresIn:"1d",
});
return token;
};
module.exports = mongoose.model("User",userSchema)