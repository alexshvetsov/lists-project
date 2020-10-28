import mongoose from 'mongoose';

const itemSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
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
}, { timestamps: true })

const Item = mongoose.model('Item', itemSchema)

export default Item  