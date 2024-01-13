const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title:{
        type : String,
        requried : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    minQuantity : {
        type : Number,
        required : true
    },
    sellerName : {
        type : String,
        required : true
    }, 
    sellerId : {
        type : String,
        required : true

    }
})

module.exports = mongoose.model('Product' , ProductSchema)