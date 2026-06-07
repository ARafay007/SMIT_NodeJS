
import jwt from 'jsonwebtoken';

export const authorize = async (req, res, next) => {
    try{
        let token = req.headers?.authorization?.split(' ');
        let verify = 'Token expire';

        if(token?.length){
            verify = await jwt.verify(token[1], process.env.JWT_SECRET);
        }
        else{
            res.status(400).json({message: 'Access denied'});
        }

        if(verify.data){
            next();
        }
        else{
            throw "Token Expired";
        }

    }
    catch(error){
        console.log(error.message);
        res.status(400).json({message: error.message});
    }
}