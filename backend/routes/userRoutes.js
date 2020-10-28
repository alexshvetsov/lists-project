import express from 'express';
const router = express.Router();
import { authUser, registerUser} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js'


// public route, fetching all the products
router.route('/')
    .post(registerUser)

router.post('/login', authUser);

export default router  