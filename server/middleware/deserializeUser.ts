import { NextFunction, Request, Response } from "express";
import { getSession } from "../db";
import { signJWT, verifyJWT } from "../utils/jwt.utils";
import { access } from "fs";

function deserializeUser(req:Request, res:Response, next: NextFunction){

    const {accessToken, refreshToken} = req.cookies;
    console.log("Access Token: ", accessToken);
    console.log("Refresh Token: ", refreshToken);

    if(!accessToken){
        return next();
    }

    const {payload, expired} = verifyJWT(accessToken);

    //for a valid access token 
    if(payload){
        //@ts-ignore
        req.user = payload;

        //@ts-ignore
        console.log(req.user);
        return next();
    }

    //expired but valid access token
    const {payload: refresh} = expired && refreshToken ? verifyJWT(refreshToken) : {payload: null};

    console.log("Refresh is: ",refresh);
    if(!refresh){
        return next();
    }

    //@ts-ignore
    const session = getSession(refresh.sessionId);
    if(!session){
        return next();
    }

    const newAccessToken = signJWT(session, "5s");
    res.cookie("accessToken", newAccessToken, {maxAge: 3000000, httpOnly: true});
    //@ts-ignore
    req.user = verifyJWT(newAccessToken).payload;
    return next();
}

export default deserializeUser;