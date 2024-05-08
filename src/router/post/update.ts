import { Router, Request, Response, NextFunction } from "express";
import Post from "../../models/post";

const router = Router();

router.post('/api/post/update/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title, content } = req.body;
    if(!id){
        const error = new Error('Post Id is required') as CustomError
        error.status = 400
        next();
    }
    let updatedPost;
    try {
        updatedPost = await Post.findOneAndUpdate(
            { _id: id },
            { $set: { content, title } },
            { new: true })
    } catch (err) {
        const error = new Error('The Post Cannot Be Updated') as CustomError
        error.status = 400;
        next();
    }
        
    res.status(200).send(updatedPost);
})

export { router as updatePostRouter}