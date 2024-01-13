const User = require('../Model/userModel');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function createToken(id) {
    return jwt.sign(id, process.env.SECRET, { expiresIn: '3d' });
}


async function signup( req , res) {

    const { name, email, password , phoneNumber , address , isBuyer} = req.body;
    console.log(email)
    try {
        if (!email || !password)
            throw Error('All fields are required');
        if (!validator.isEmail(email))
            throw Error("Please enter a valid email");

        const userExists = await User.findOne({ email });
        if (userExists) throw Error("User already exists , try loging In");

        if (!validator.isStrongPassword(password))
            throw Error("Please enter a strong password");

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hash , address , phoneNumber , isBuyer });
        const token = createToken(user._id);
        res.json({ user, token })
    } catch (error) {
        res.json({ message: error });
        console.log(error)
    }

}

async function login(req, res) {

    const { email, password } = req.body;

    try {
        if (!email || !password)
            throw Error("All fields are required");

        const user = await User.findOne({ email })
        if (!user) throw Error("Incorrect Email for login");

        const compare = await bcrypt.compare(password, user.password);

        if (!compare) {
            throw Error("Incorrect Password");
        }

        const token = createToken(user._id);
        res.json({token , user});

    } catch (error) {
        res.json({message : error});
    }
}


module.exports = {
    login , 
    signup
}