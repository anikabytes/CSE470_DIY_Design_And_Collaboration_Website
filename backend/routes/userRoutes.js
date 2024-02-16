import express from 'express';
import {  userRegister, userLogin, userLogout, userProfile, userProfileUpdate } from '../controllers/userController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/logout', userLogout);
router.get('/profile', verifyToken, userProfile);
router.put('/profile', verifyToken, userProfileUpdate);

export default router;