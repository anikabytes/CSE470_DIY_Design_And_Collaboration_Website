import User from '../models/userModel.js';
import generateToken from '../middleware/generateToken.js';
import mongoose from "mongoose";

// Register: /api/register
// POST
const userRegister = async (req, res) => {
    const {fname, lname, email, password, address} = req.body;
    
    if (await User.findOne({email})){
        res.status(400).json({ message: "Email already taken" });
    }

    const user = await User.create({
        fname,
        lname,
        email,
        password,
        address,
        dress
      });

    if (user) {
        generateToken(res, user._id);
        res.status(200).json({
            id: user.id,
            fname: user.fname
        });
    }
    else{
        res.status(400).json({ message: "Cannot register" });
    }
};

// Login: /api/login
// POST
const userLogin = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email})
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id)
        res.status(200).json({
            id: user.id,
            fname: user.fname
        });
    }
    else{
        res.status(400).json({ message: "Wrong email or password" });
    }
};

// Logout: /api/logout
// POST
const userLogout = async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
      });

    res.status(200).json({message: 'User logged out'});
};

// Profile: /api/profile
// GET

const userProfile = async (req, res) => {
    const user = await User.findById(req.user.userId);

    res.status(200).json(
        {
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            address: user.address,
            dress: user.dress
            
        }
    );
};

// Save Dress: /api/savedress
// POST
const saveDress = async (req, res) => {
    const user = await User.findById(req.user.userId);

    if (user) {
        user.dress.push(req.body.dress);
        await user.save();

        res.status(200).json({
            id: user.id,
            dress: user.dress
        });

        
    }
    else{
        res.status(400).json({ message: "Cannot show dress" });
    }
};


// Update profile: /api/profile
// PUT
const userProfileUpdate = async (req, res) => {
    const user = await User.findById(req.user.userId);

    if (user){
        user.fname = req.body.fname || user.fname;
        user.lname = req.body.lname || user.lname;
        user.email = req.body.email || user.email;
        user.address = req.body.address || user.address;

        if (req.body.password){
            user.password = req.body.password;
        }

        const updated = await user.save();

        res.status(200).json({
            fname: updated.fname
        })
    }
    else{
        res.status(400).json({message: "Cannot update profile"});
    }

};


export {userRegister, userLogin, userLogout, userProfile, userProfileUpdate, saveDress};
