import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({path: '../.env'});

//JWT creation

const JWT_SECRET = "DavexAuth"
export function signJWT(payload: JwtPayload, expiresIn: string | number){
    return jwt.sign(payload,JWT_SECRET, {expiresIn});
}

//JWT authentication process 
export function verifyJWT(token: string){
    try{
        const decoded = jwt.verify(token, JWT_SECRET); 
        return {payload: decoded, expired: false}
    }catch(error:any){
        return {payload: null, expired: error.message.includes("jwt expired")};
    }
}