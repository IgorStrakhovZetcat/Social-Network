import CommentModel from "../models/Comment.js"


export const getAll = async (req, res) => {
    try {
        const comments = await CommentModel.find().populate('user').exec();

        res.json(comments)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'We cant get all comments'
        })
    }
}

export const remove = async (req, res) => {
    try {
        const commentId = req.params.id;
        
        CommentModel.findByIdAndDelete({
            _id: commentId
        }, (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'We cant remove one comment'
                })
            }
            if(!doc){
                return res.status(404).json({
                    message: "undefind comment"
                })
            }

            res.json({
                success: true
            })
        })

        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'We cant get one comment'
        })
    }
}

export const update = async (req, res) => {
    try {
        const commentId = req.params.id;
        
        await CommentModel.findByIdAndUpdate({
            _id: commentId
        }, 
        {
            text: req.body.text,
            user: req.userId,
            postId: req.postId
        })

        res.json({
            success: true,
        })
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'We cant update comment'
        })
    }
}

export const create = async (req, res) => {
    try {
        const doc = new CommentModel({
            text: req.body.text,
            user: req.userId,
            postId: req.body.postId
        });

        const comment = await doc.save();
        res.json(comment);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'We cant create comment'
        })
    }
}