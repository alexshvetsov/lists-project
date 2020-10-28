import Item from '../models/itemModel.js';
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';

//public route, get all public items, get /

const getPublicItems = asyncHandler(async (req, res) => {
    const items = await Item.find({ isPublic: true }).populate('user')
    if (items) {
        res.json(items)
    } else {
        res.status(404)
        throw new Error('Items not found')
    }
})

//private route, get all private items, get /private

const getPrivateItems = asyncHandler(async (req, res) => {
    const items = await Item.find({ isPublic: false, user: req.user }).populate('user')
    if (items) {
        res.json(items)
    } else {
        res.status(404)
        throw new Error('Items not found')
    }
})

//private route, get all items, get /all

const getAllItems = asyncHandler(async (req, res) => {
    const items = await Item.find({
        $or: [{ isPublic: true } , { user: req.user }]
    }).populate('user')
    if (items) {  
        res.json(items)
    } else {
        res.status(404)
        throw new Error('Items not found')
    }
})


//private route, get all my items, get /privatepublic 

const getPrivatePublicItems = asyncHandler(async (req, res) => {
    const items = await Item.find({ user: req.user }).populate('user')
    if (items) {
        res.json(items)
    } else {
        res.status(404)
        throw new Error('Items not found')
    }
})

// private route, add item to db, post /

const addItem = asyncHandler(async (req, res) => {
    const item = new Item({
        user: req.user._id,
        name: req.body.name,
        isPublic: req.body.isPublic
    })
    const addedItem = await item.save()
    addedItem.user = req.user
    res.status(201).json(addedItem)
})

// private route, delete list from db, delete /:id


const deleteItem = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id)

    if (item && item.user._id.toString() === req.user._id.toString()) {
        await item.remove()
        res.json({ message: 'Deleted' })
    } else if (item.user._id !== req.user._id) {
        res.status(401)
        throw new Error('Item add by another user')
    } else {
        res.status(404)
        throw new Error('Item not found')
    }
})

export {
    addItem,
    getPublicItems,
    deleteItem,
    getPrivateItems,
    getPrivatePublicItems,
    getAllItems
}