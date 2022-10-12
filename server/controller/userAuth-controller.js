import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserAuth from '../schema/user-auth-schema.js';

// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const asyncHandler = require('express-async-handler');
// const User = require('../schema/user-auth-schema');


// @desc Register new User
// @route POST /users
// @access Public
export const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            throw new Error('Please add all fields');
        }

        // check if user exists
        const userExist = await UserAuth.findOne({ email })
        if (userExist) {
            const error = new Error("User Alread Exist")
            error.code = 409
            throw error;
        }

        // Hash password: 10 is default round number 
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // create user
        const newUser = await UserAuth.create({
            name, email, password: hashPassword,
        });

        if (newUser) {
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                token: generateToken(newUser._id),
                message: 'New User Created Successfully'
            });
        } else {
            throw new Error('Invalid User Data');
        }
    } catch (error) {
        res.status(error?.code || 409).json({ message: error.message });
    }
}


// @desc Authenticate User
// @route POST /users/login
// @access Public
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check for user email
        const user = await UserAuth.findOne({ email });

        // check user and compare plain password with hash password
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                token: generateToken(user._id),
                message: 'Successfully logged In'
            });
        } else {
            res.status(400);
            throw new Error('Invalid Credientials');
        }
        
    } catch (error) {
        res.json({ message: error.message });
    }
}

// @desc Get user data
// @route GET /users/me
// @access Private
export const getMe = async (req, res) => {
    // user id that we are getting from the middleware request response
    const {_id , name ,email} = await UserAuth.findById(req.user.id);

    res.status(200).json({
        id: _id,
        name: name,
        email: email,
        message: 'User data Page'
    })
}



// Generate JWT
export const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET , {
        expiresIn:'30d',
    })
}