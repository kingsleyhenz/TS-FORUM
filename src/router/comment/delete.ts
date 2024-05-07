import { Router, Request, Response, NextFunction } from "express";
import Post from "src/models/post";
import Comment from "src/models/comment";

const router = Router();

router.delete('/api/comment/:commentId/delete/:postId', async (req: Request, res: Response, next: NextFunction) => {
    const { postId, commentId } = req.params;
    if(!commentId || !postId){
        const error = new Error('Post Id and Comment Id are both required') as CustomError;
        error.status = 400;
        next(error);
    }
    try {
        await Comment.findOneAndDelete({ _id: commentId }) 
    } catch (error) {
        next(new Error('Comment cannot be updated'))
    }
    
    await Post.findOneAndUpdate(
        { _id: postId},
        { $pull: { comments: commentId } }
        )

    res.status(200).json({ success: true })
})

export {router as deleteCommentRouter};