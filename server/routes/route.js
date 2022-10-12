import express from 'express';
import { addUser, getUsers, getUser, editUser, deleteUser } from '../controller/user-controller.js';

// protecting routes
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/add', protect, addUser);
router.get('/all', protect, getUsers);
router.get('/:id', protect, getUser);
router.put('/:id', protect, editUser);
router.delete('/:id', protect, deleteUser);



// export default router;
export const userRoutes = router;