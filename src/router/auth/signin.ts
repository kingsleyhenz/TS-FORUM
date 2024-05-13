import { Router, Response, Request, NextFunction } from 'express'
import User from '../../models/user';

const router = Router();

router.post('/signin', async(req: Request, res: Response, next: Function)=>{
    const { email, password } = req.body;

    const user = await User.findOne({email})
    if(!user) return next(new Error('wrong credentials'))
    
})


export {router as signInRouter}