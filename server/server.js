require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors())


app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const ProductRouter = require('./router/productRouter');
const UserRouter = require('./router/userRouter');

app.use('/product' , ProductRouter);
app.use('/user' , UserRouter);

mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(process.env.PORT , ()=>{
        console.log('Connected to db and listening to port👻')
    })
}).catch(error=>{
    console.log(error)
})
