const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
    console.log('ok');
    const { name, email, password } = req.body;
    console.log(name , email , password)
    try {
        let user = await  User.findOne({email:{$eq:email}})
        console.log(user)
        if (user) {
            return res.status(400).json({code: 0 , msg: "User already exists"});
        }
        user = new User({name , email , password})

        const salt = await bcrypt.genSalt(12);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        const payload = {user: {id: user.id}}
        const token = jwt.sign(payload , process.env.JWT_SECRET , {expiresIn: "1h"});

        res.json({code:1 , message: 'عملیات موفق' , token: token})
    } catch (e) {
        res.status(500).json({code: 0 , msg: 'خطا در عملیات' , err: e.message})
    }
}


exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({code: 0 , msg: 'یوزر یا پسورد اشتباه است.'})
        }
        const isMatch = await bcrypt.compare(password , user.password)
        if (!isMatch) {
            return  res.status(400).json({code: 0 , msg: 'یوزر یا پسورد اشتباه است.'})
        }

        const payload = {user: {id: user.id}}
        const token = jwt.sign(payload ,process.env.JWT_SECRET , {expiresIn: "1h"});

        res.json({code: 1 , msg: 'عملیات موفق' , token: token})
    } catch (e) {
        res.status(500).json({code: 0 , message: 'خطایی رخ داد' , error: e.message})
    }
}