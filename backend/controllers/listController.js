import List from '../models/listModel.js';
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';

//public route, get all public lists, get /

const getPublicLists = asyncHandler(async (req, res) => {
    const lists = await List.find({ isPublic: true }).populate('user').populate('items.user').populate('permittedUsers.user')
    if (lists) {
        res.json(lists)
    } else {
        res.status(404)
        throw new Error('lists not found')
    }
})

//private route, get all private lists, get /private

const getPrivateLists = asyncHandler(async (req, res) => {
    const lists = await List.find({ isPublic: false, user: req.user }).populate('user').populate('items.user').populate('permittedUsers.user')
    if (lists) {
        res.json(lists)
    } else {
        res.status(404)
        throw new Error('lists not found')
    }
})




//private route, get all my lists, get /allMyLists

const getAllMyLists = asyncHandler(async (req, res) => {
    const lists = await List.find({
        $or: [{ user: req.user }, { "permittedUsers.user": req.user }]
    }).populate('user').populate('items.user').populate('permittedUsers.user')
    if (lists) {
        res.json(lists)
    } else {
        res.status(404)
        throw new Error('lists not found')
    }
})

//private route, get all  lists, get /allLists

const getAllLists = asyncHandler(async (req, res) => {
    const lists = await List.find({
        $or: [{ isPublic: true }, { user: req.user }, { "permittedUsers.user": req.user }]
    }).populate('user').populate('items.user').populate('permittedUsers.user')
    if (lists) {
        res.json(lists)
    } else {
        res.status(404)
        throw new Error('lists not found')
    }
})

// private route, add list to db, post /

const addList = asyncHandler(async (req, res) => {
    let permittedUsersArray = []
    for (let i = 0; i < req.body.permittedUsersArray.length; i++) {
        let user = await User.findOne({ email: req.body.permittedUsersArray[i] })
        if (user) {
            permittedUsersArray.push({ user: user._id })
        }
    }
    const list = new List({
        user: req.user._id,
        permittedUsers: permittedUsersArray,
        items: [],
        name: req.body.name,
        isPublic: req.body.isPublic
    })
    const addedList = await list.save()
    addedList.user = req.user
    res.status(201).json(addedList)
})

// private route, add item to list, put /:id/additem
const addItem = asyncHandler(async (req, res) => {
    const list = await List.findById(req.params.id)
    const item = {
        user: req.user,
        name: req.body.name
    }
    if (list) {
        list.items = [...list.items, item]
        let updatedList = await list.save()
        updatedList = await List.findById(req.params.id).populate('user').populate('items.user').populate('permittedUsers.user')
        res.status(201).json(updatedList)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// private route, delete item from list, delete /:id/:itemID
const deleteItem = asyncHandler(async (req, res) => {
    const list = await List.findById(req.params.id)
    const id = req.params.itemID
    if (list) { 
       list.items= list.items.filter(item=>item._id.toString() !== id.toString())
        let updatedList = await list.save()
        updatedList = await List.findById(req.params.id).populate('user').populate('items.user').populate('permittedUsers.user')
        res.status(201).json(updatedList)
    } else {
        res.status(404)
        throw new Error('List not found')
    }
})

// private route, delete list from db, delete /:id


const deleteList = asyncHandler(async (req, res) => {
    const list = await List.findById(req.params.id)

    if (list && list.user._id.toString() === req.user._id.toString()) {
        await list.remove()
        res.json({ message: 'Deleted' })
    } else if (list.user._id !== req.user._id) {
        res.status(401)
        throw new Error('List add by another user')
    } else {
        res.status(404)
        throw new Error('List not found')
    }
})



export {
    getPublicLists,
    addList,
    deleteList,
    getPrivateLists,
    getAllMyLists,
    getAllLists,
    addItem,
    deleteItem
}