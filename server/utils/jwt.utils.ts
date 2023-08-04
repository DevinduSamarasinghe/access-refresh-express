import jwt from 'jsonwebtoken';

export function signJWT(payload: object, expiresIn: string | number){
    return jwt.sign(payload, process.env.JWT_SECRET!, {algorithm: "RS256",expiresIn});
}

export function verifyJWT(token: string){
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        return {payload: decoded, expired: false}
    }catch(error:any){
        return {payload: null, expired: error.message.includes("jwt expired")};
    }
}