import express from 'express';
import { getMe, loginUser, registerUser } from '../controller/userAuth-controller.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();


router.post('/', registerUser);
router.post('/login', loginUser);

// here is protect route with user data first we have to pass bearer token [ user tocken ] inside req auth then run the api
router.get('/me', protect, getMe);



export const userAuthRouter = router;