import express from 'express';
import {  userRegister, userLogin, userLogout, userProfile, userProfileUpdate, saveDress, shareDress, getUsers, follow, getOrder, postOrder, removeOrder, getMessage, sendMessage } from '../controllers/userController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/logout', userLogout);
router.get('/profile', verifyToken, userProfile);
router.put('/profile', verifyToken, userProfileUpdate);
router.post('/savedress', verifyToken, saveDress);
router.post('/sharedress', verifyToken, shareDress);
router.get('/getusers', verifyToken, getUsers);
router.post('/follow', verifyToken, follow);
router.get('/order', verifyToken, getOrder);
router.post('/order', verifyToken, postOrder);
router.post('/removeorder', verifyToken, removeOrder);
router.post('/message', verifyToken, sendMessage);
router.get('/message', verifyToken, getMessage);

export default router;