import { body } from "express-validator";



export const loginValidation = [
    body('email', "wrong email or password").isEmail(), 
    body('password', 'wrong email or password').isLength({ min: 5 }),
]

export const registerValidation = [
    body('email', "wrong email").isEmail(), 
    body('password', 'wrong password').isLength({ min: 5 }),
    body('fullName').isLength({ min: 3 }),
    body('avatarUrl').optional().isString(),
]

export const postCreateValidation = [
    body('title', "wrong title").isLength({ min: 3 }).isString(), 
    body('text', 'wrong text').isLength({ min: 3 }).isString(),
    body('tags', 'wrong tags').optional().isString(),
    body('imageUrl', 'wrong image url').optional().isString()
]

export const commentCreateValidation = [
    body('text', 'wrong text').isLength({ min: 1 }).isString(),
    body('postId', 'wrong postId').isString()
]

