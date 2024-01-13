const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    email : {
        type : String ,
        requried : true
    },
    password : {
        type : String ,
        requried : true
    },
    Name: {
        type : String ,
        requried : true
    },
    address : {
        type : String ,
        requried : true
    },
    isSeller : {
        type : Boolean ,
        requried : true
    },
    phoneNumber : {
        type : Number,
        requried : true
    },
})

module.exports = mongoose.model('User' , userSchema);
