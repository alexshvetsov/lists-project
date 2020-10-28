import express from 'express'
const router = express.Router();
import { getPublicLists, addList, deleteList, getPrivateLists, getAllMyLists, getAllLists, addItem, deleteItem } from '../controllers/listController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/')
    .get(getPublicLists)
    .post(protect, addList)


router.route('/private')
    .get(protect, getPrivateLists)

router.route('/all')
    .get(protect, getAllLists)

router.route('/privateshared')
    .get(protect, getAllMyLists)

    router.route('/:id/additem')
    .put(protect, addItem) 

router.route('/:id')
    .delete(protect, deleteList)

    router.route('/:id/:itemID')
    .delete( deleteItem)

export default router