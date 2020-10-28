import express from 'express'
const router = express.Router();
import { getPublicItems, addItem, deleteItem, getPrivateItems, getPrivatePublicItems, getAllItems } from '../controllers/itemController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/')
    .get(getPublicItems)
    .post(protect, addItem)

router.route('/private')
    .get(protect, getPrivateItems)

router.route('/all')
    .get(protect, getAllItems)

router.route('/privatepublic')
    .get(protect, getPrivatePublicItems)


router.route('/:id')
    .delete(protect, deleteItem)

export default router