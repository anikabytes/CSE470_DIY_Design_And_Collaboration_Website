import express from 'express';
import {  userRegister, userLogin, userLogout, userProfile, userProfileUpdate, saveDress, shareDress } from '../controllers/userController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/logout', userLogout);
router.get('/profile', verifyToken, userProfile);
router.put('/profile', verifyToken, userProfileUpdate);
router.post('/savedress', verifyToken, saveDress);
router.post('/sharedress', verifyToken, shareDress);

export default router;