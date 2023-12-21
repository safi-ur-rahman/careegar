const User = require('../models/user')
const { hashPassword, comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken')

const getProfile = (req, res) => {
    if (req.cookies && req.cookies.token) {
        const { token } = req.cookies;
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;
            res.json(user);
        });
    } else {
        res.json(null);
    }
};


const registerUser = async (req, res) => {
    try{
        const {name, phoneNumber, email, password} = req.body;

        // check name
        if(!name) {
            return res.json({
                error: 'Name is requierd!'
            })
        };
        // check phone number
        if(phoneNumber.length != 11) {
            return res.json({
                error: 'Enter a valid phone number!'
            })
        };

        // check password
        if(!password) {
            return res.json({
                error: 'Password is requierd!'
            })
        };
        if(password.length < 8) {
            return res.json({
                error: 'Password should be at least of 8 characters!'
            })
        };

        // check email
        const exist = await User.findOne({email});
        if (exist) {
            return res.json({
                error:  'Email already in use.'
            })
        };
        // Check if email has @ and .com
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.json({
                error: 'Enter a valid email address!'
            });
        }


        const hashedPassword = await hashPassword(password)

        //create user in db
        const user = await User.create({
            name, 
            phoneNumber, 
            email, 
            password: hashedPassword
        })

        return res.json(user);
    } catch (error) {
        console.log(error);
    }
}


const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Check if email has @ and .com
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.json({
                error: 'Enter a valid email address!'
            });
        }
        // Check if user exists
        const user = await User.findOne({email});
        if(!user) {
            return res.json({
                error: 'No User Found with this Email!'
            })
        }

        // if password match
        const match = await comparePassword(password, user.password)
        if (match) {
            jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(user)
            })
            
        }
        else if (!match) {
            res.json({
                error: "Wrong Password!"
            })
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getProfile,
    registerUser,
    loginUser
}