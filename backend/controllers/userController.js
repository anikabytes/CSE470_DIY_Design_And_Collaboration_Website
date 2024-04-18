import User from '../models/userModel.js';
import Product from '../models/storeItems.js';
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
        // dress,
        // followers,
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
            dress: user.dress,
            followers: user.followers,
            
        }
    );
};

// Add followers : /api/addFollowers 
// POST 
const addFollowers = async (req,res) => {
    try {
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({message:"User not found"});
        }
        const {email} = rrq.body;

        if (!email){
            return res.status(404).json({message:"Follower not found"});
        }

        const followers = await User.findOne({email});

        if (!followers){
            return res.status(404).json({message:"Follower not found"});
        }

        if (followers._email.equals(req.user.email)) {
            return res.status(400).json({message:"You can't follow yourself"});
        }

        if (user.followers.includes(followers._email)){
            return res.status(400).json({message:"You both are already friends"});
        }

        user.followers.push(followers._email);
        await user.save();

        res.status(200).json({
            message:"Follower added Successfully",
            followers_email:followers._email,
        });


    }
    catch (error) {
        console.error("Error adding followers:",error);
        res.status(500).json({message:"Internal server error"});
    }
};


//View Users: /api/getUsers 
// FETCH 
const getUsers = async (req, res) => {
    try {
      const user = await User.findByEmail(req.user.userEmail) 
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const username = user.users.map(user => user.username);
      const useremail = user.users.map(user => user.email);
      
      res.status(200).json({ users });
    } catch (error) {
      console.error("Error fetching followers:", error);
      res.status(500).json({ message: "Internal server error" });
    }
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

// Share Dress: /api/sharedress
// POST
const shareDress = async (req, res) => {
    const user = await User.findById(req.user.userId);

    const product = new Product({
        name: 'Custom Designed Dress',
        price: 0.00,
        description: `One of ${user.fname}'s design`,
        productImages: req.body.share,
        designedby: user.fname
    });

    await product.save();
}

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


export {userRegister, userLogin, userLogout, userProfile, userProfileUpdate, addFollowers, saveDress, shareDress, getUsers};
