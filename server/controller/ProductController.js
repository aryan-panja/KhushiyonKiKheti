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
    const { title , description , sellerName , sellerId , price , minQuantity , testQuantity , testQuantityPrice } = req.body;
    console.log(sellerName)
    try{
        if(sellerId !== req.userId ) 
            throw Error("Incorrect sellerId , you don't have the authorization to add products to this Id");

        const product = await Product.create({title , description  , sellerId , sellerName , price , minQuantity , testQuantity , testQuantityPrice});
        console.log(product)
        res.json(product);
    }catch(error){
        res.json({message : error});
        console.log(error)

    }
}


module.exports = { 
    addProduct ,
    getAllProducts,
    getProductById  
}