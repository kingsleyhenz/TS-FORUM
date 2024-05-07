import { Router, Request, Response, NextFunction } from "express";
import Comment from "src/models/comment";
import Post from './../../models/post';

const router = Router();

router.post('/api/comment/new/:postId', async (req: Request, res: Response, next: NextFunction) => {
    const {userName, content} = req.body;
    const { postId } = req.params;
    if(!content) {
        const error = new Error('Content are required') as CustomError
        error.status = 400;
        return next(error)
    }
    const newComment = new Comment({
        userName: userName? userName : 'anonymous',
        content
    });
    await newComment.save();
    const newPost = await Post.findOneAndUpdate({ _id: postId })

    res.status(201).send(newComment);
})

export {router as newCommentRouter}