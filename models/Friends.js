import mongoose from "mongoose";

const FriendsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    friends: {
        type: Array,
        default: []
    },
}, {
    timestamps: true,

});

export default mongoose.model('Friends', FriendsSchema)