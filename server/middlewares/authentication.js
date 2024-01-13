const jwt = require('jsonwebtoken');
const User = require('../Model/userModel');

async function Authentication( req , res , next ){

    const { authorization } = req.headers;
    if( !authorization ) 
        return res.json({message : "Authorization failed"});
    const token = authorization.split(' ')[1];

    try{
        const { id } = jwt.verify( token , process.env.SECRET);
        req.userId = id;
        next();
    }catch(error){
        res.json({message : error});
    }
}

module.exports = Authentication