
import { jsonGenerate } from "../utils/helpers.js"
import { JWT_SECRET, StatusCode } from "../utils/constants.js"
import Jwt from 'jsonwebtoken'

const AuthMiddleware=(req,res,next)=>{
    if(req.headers["auth"]===undefined){
        return res.json(jsonGenerate(StatusCode.AUTH_ERROR,"Access Denied"))
    }

    const token= req.headers['auth'];

    try {
        const decoded=Jwt.verify(token,JWT_SECRET);
        console.log(decoded);

        req.userId=decoded.userId;

        return next();
    } catch (error) {
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,"Invalid token"))
    }
}

export default AuthMiddleware;