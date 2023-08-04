import {Request, Response} from 'express';
import { createSession, getUser, invalidateSession } from '../db';
import { signJWT, verifyJWT } from '../utils/jwt.utils';


//This is same as creating a login and giving an access Token 
export function createSessionHandler(req: Request, res: Response){
    const {email, password} = req.body;
    const user =  getUser(email);

    if(!user || user.password !== password){
        return res.status(401).json({message: "Invalid email or password"});
    }

    const session = createSession(user.email, user.name);
    const accessToken = signJWT({
        email: user.email, name: user.name, sessionId: session.sessionId
    }, "10m");

    const refreshToken = signJWT({
        sessionId: session.sessionId
    }, "30d");

    //set access token in cookie
    res.cookie("accessToken", accessToken, {maxAge: 600000, httpOnly: true});

    res.cookie("refreshToken", refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    })

    //send user back
    return res.send(session);
}

export function getSessionHandler(req:Request, res:Response){
    //@ts-ignore 
    //This is not a good practice
    return res.send(req.user);
}

export function deleteSessionHandler(req:Request, res:Response){
    res.cookie("accessToken", "", {maxAge: 0,httpOnly:true});
    res.cookie("refreshToken", "", {maxAge: 0,httpOnly:true});

    //@ts-ignore
    const session = invalidateSession(req.user.sessionId);

    return res.send(session);
}