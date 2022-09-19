import PostModel from "../models/Post.js"


export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(15).exec();

        const tags = posts.map(obj => obj.tags).flat().slice(0, 15)

        res.json(tags)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'We cant get tags'
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'We cant get all posts'
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        
        PostModel.findOneAndUpdate(
            {
                _id: postId,
            },
            {
                $inc: { viewsCount: 1 }
            },
            {
                returnDocument: 'after'
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'We cant get one post'
                    })
                }
                if(!doc){
                    return res.status(404).json({
                        message: "undefind post"
                    })
                }

                res.json(doc)
            }
        ).populate('user');

        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'We cant get one post'
        })
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
        
        PostModel.findByIdAndDelete({
            _id: postId
        }, (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'We cant remove one post'
                })
            }
            if(!doc){
                return res.status(404).json({
                    message: "undefind post"
                })
            }

            res.json({
                success: true
            })
        })

        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'We cant get one post'
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id;
        
        await PostModel.findByIdAndUpdate({
            _id: postId
        }, 
        {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(' '),
            user: req.userId,
            date: req.date
        })

        res.json({
            success: true,
        })
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'We cant update post'
        })
    }
}

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(' '),
            user: req.userId,
            date: req.body.date
        });

        const post = await doc.save();
        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'We cant create post'
        })
    }
}