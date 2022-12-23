const mongoose = require("mongoose");
const validator = require("validator");

const productSchema = new mongoose.Schema({   
     name:{
        type: String,
        required: [true, "Please enter your name"],
        minlength: 2,
    },
    email:{
        type: String,
        required: [true, "Please enter your email"],
        validator:[validator.email, "Please enter a valid email"]
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
module.exports = mongoose.model("Product",productSchema)