import { NextFunction, Request, Response } from "express";

export function requiredUser(req:Request, res:Response, next:NextFunction){
    //@ts-ignore
    if(!req.user){
        return res.status(403).json({message: "Unauthorized"});
    }
    return next();
}