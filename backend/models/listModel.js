import mongoose from 'mongoose';

const listSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    permittedUsers: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }],
    items: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        name: { type: String, required: true },
        date: { type: Date, default: Date.now }
    }],
    name: {
        type: String,
        required: true,
    },
    isPublic: {
        type: Boolean,
        required: true,
        default: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const List = mongoose.model('List', listSchema)

export default List  