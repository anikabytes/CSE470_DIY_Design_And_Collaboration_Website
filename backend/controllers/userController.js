import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import Message from '../models/messageModel.js';
import Checkout from '../models/checkoutModel.js';
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
        address
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
    if (user){
        res.status(200).json(
            {
                fname: user.fname,
                lname: user.lname,
                email: user.email,
                address: user.address,
                dress: user.dress,
                followers: user.followers
            }
        );
    }
    else{
        res.status(400).json({ message: "Cannot get profile" })
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

    try{
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.desc,
            productImages: req.body.share,
            designedby: user.fname
        });
        await product.save();
        res.status(200).json({ message: "Shared successfully" })
        }
    catch(e){
        res.status(400).json({ message: "Cannot share dress" })
        }
    }
    
// Get All Users: /api/getusers
// GET
const getUsers = async (req, res) => {
    const allUsers = await User.find({});
    res.status(200).json({
        count: allUsers.length,
        data: allUsers
    })
}

// Follow Users: /api/follow
// POST
const follow = async (req, res) => {
    const user = await User.findById(req.user.userId);

    const fname = await req.body.fname
    const lname = await req.body.lname
    const email = await req.body.email

    if (user) {
        user.followers.push({fname, lname, email});
        await user.save();

        res.status(200).json({
            id: user.id,
            dress: user.dress
        });  
    }
    else{
        res.status(400).json({ message: "Cannot follow" });
    }
}

// Get Orders: /api/order
// GET
const getOrder = async (req, res) => {
    const user = await User.findById(req.user.userId);

    res.status(200).json({
        data: user.order
    })
}

// Post Orders: /api/order
// POST
const postOrder = async (req, res) =>{
    const user = await User.findById(req.user.userId);

    const id = req.body.id;
    const name = req.body.name;
    const image = req.body.img;
    const price = req.body.price;

    if (user) {
        user.order.push({id, name, image, price});
        await user.save();

        res.status(200).json({
            id: id,
            name: name,
            img: image,
            price: price
        });  
    }
    else{
        res.status(400).json({ message: "Cannot follow" });
    }
}

// Remove Order: /api/removeorder
// POST
const removeOrder = async (req, res) =>{
    try {
        const user = await User.findById(req.user.userId);

        
        if (user){
            
            await User.findOneAndUpdate(
                {_id: user._id},
                {$pull: {order : {id: req.body.order}}},
                { new: true },
            )

            return res.status(200).json({
                order: req.body.order
            })
        }
        
        

      } catch (e) {
        res.status(400).send({ message: e.message });
      }
    }


// Send Message: /api/message
// POST
const sendMessage = async (req, res) =>{
    const user = await User.findById(req.user.userId);

    try{
        const message = new Message({
            name: user.fname,
            message: req.body.msg
        });
        await message.save();
        res.status(200).json({ message: "Message sent successfully" })
        }
    catch(e){
        res.status(400).json({ message: "Cannot send message" })
        }
    }

// Get Message: /api/message
// GET
const getMessage = async (req, res) =>{
    try {
        const user = await User.findById(req.user.userId);

        const messages = await Message.find({});
    
        return res.status(200).json({
            name: user.fname,
            msgs: messages,
        });

      } catch (e) {
        res.status(400).send({ message: e.message });
      }
    }

// Post Checkout: /api/checkout
// POST



export {userRegister, userLogin, userLogout, userProfile, userProfileUpdate, saveDress, shareDress, getUsers, follow, getOrder, postOrder, removeOrder, sendMessage, getMessage};
