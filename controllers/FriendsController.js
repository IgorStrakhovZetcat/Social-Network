import FriendsModel from "../models/Friends.js"



export const getAll = async (req, res) => {
    try {
        const friends = await FriendsModel.find().populate('user').exec();

        res.json(friends)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'We cant get all friends'
        })
    }
}

export const addFriend = async (req, res) => {
    try {
        const friendsId = req.params.id
        await FriendsModel.findByIdAndUpdate({
            _id: friendsId
        }, 
        {
            friends: req.body.friends.split(' '),
            //user: req.userId
        })
        
        res.json({
            success: true,
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'We cant add friend'
        })
    }

}

export const create = async (req, res) => {
    try {
        const doc = new FriendsModel({
            user: req.userId,
            friends: req.body.friends
        });

        const friends = await doc.save();
        res.json(friends);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'We cant create friends'
        })
    }
}