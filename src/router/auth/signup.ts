import { Router, Response, Request, NextFunction } from 'express'
import User from '../../models/user';

const router = Router();

router.post('/signup', async(req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if(user) return new Error('User already exists')

    const newUser = await User.create({
        email,
        password,
    })
    await newUser.save();
    res.status(201).send(newUser)
})

export { router as signupRouter }