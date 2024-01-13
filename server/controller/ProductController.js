const Product = require('../Model/productModel');

async function getProductById( req , res ){
    const _id = req.params.id;

    try{
        const product = await Product.findOne({_id});
        res.json(product);
    }catch(error){
        res.json({message : error});
    }
}

async function getAllProducts(req , res){
    try{
        const products = await Product.find({});
        res.json(products);
    }catch(error){
        res.json({message : error});
    }
}

async function addProduct(req , res){
    const { title , description , sellerName , sellerId , location } = req.body;

    try{
        if(sellerId !== req.userId ) 
            throw Error("Incorrect sellerId , you don't have the authorization to add products to this Id");

        const product = await Product.create({title , description , location , sellerId , sellerName});
        res.json(product);
    }catch(error){
        res.json({message : error});
    }
}


module.exports = { 
    addProduct ,
    getAllProducts,
    getProductById  
}