import express from 'express';
import {  userRegister, userLogin, userLogout, userProfile, userProfileUpdate,  saveDress, shareDress, addFollowers, getUsers } from '../controllers/userController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/logout', userLogout);
router.get('/profile', verifyToken, userProfile);
router.put('/profile', verifyToken, userProfileUpdate);
router.post('/savedress', verifyToken, saveDress);
router.post('/sharedress', verifyToken, shareDress);
router.put('/addfollowers',verifyToken,addFollowers); // add followers from UI to backend 
router.get('/getUsers',verifyToken,getUsers); //get users from backend to viewUsers UI

export default router;