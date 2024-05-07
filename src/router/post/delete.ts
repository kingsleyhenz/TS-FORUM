import { Router, Request, Response, NextFunction } from "express";
import Post from "src/models/post";

const router = Router();

router.delete('/api/post/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if(!id){
        const error = new Error('Post Id is required') as CustomError;
        error.status = 400;
        next(error);
    }
    try {
        await Post.findOneAndDelete({ _id: id }) 
    } catch (error) {
        next(new Error('Post cannot be updated'))
    }

    res.status(200).json({ success: true })
})

export {router as deletePostRouter};