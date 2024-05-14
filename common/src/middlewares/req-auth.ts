import { Router, Response, Request, NextFunction } from 'express'


export const requireAuth = async (req: Request, res: Response, next: NextFunction)=>{
    if(!req.currentUser) return next(new Error('not authorized'));

    next()
}