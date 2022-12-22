const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({   
     name:{
        type: String,
        required: [true, "Please enter product name"],
        minlength: 2,
    },
    price:{
        type: Number,
        required: [true, "Please enter product's price"],
    },
    images:[
        {
            public_id:{
                type: String,
                required:true,
            },
            
                url:{
                    type: String,
                    required:[true, "Please Enter URL"],
                },
            },
    ],
    noOfReviews:{
        type: Number,
        default: 0
    },
    reviews:[
        {
            name:{
                type: String,
                required:[true,"Please Enter name"],
            },
            comment:{
                type: String,
            },
            rating:{
                type: Number,
                required: [true,"Please Enter rating"],
            },
        },
    ],
    category:{
        type: String,
        required:[true,"Please Select a category"],
        enum:[
            "Electronics",
            "Clothes",
            "Food",
            "Smart Phones",
            "Laptop",
            "Headphones",
            "Cameras",
            "Accessories",
            "Beauty",
            "Home Appliances",
        ],
    },

});
module.exports = mongoose.model("Product",productSchema)