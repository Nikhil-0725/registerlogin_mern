import express from 'express';
import { loginController, registerController, verificationController } from '../controller/authController.js';

// Router Object
const router = express.Router();

// ROUTING
// REGISTER || METHOD = POST
router.post('/register/initiate', registerController);

// REGISTER || METHOD = POST
router.post('/register/verify', verificationController);

// LOGIN || METHOD = POST
router.post('/login', loginController);


export default router;