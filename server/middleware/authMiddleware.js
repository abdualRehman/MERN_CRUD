import jwt from 'jsonwebtoken';
import UserAuth from '../schema/user-auth-schema.js';

export const protect = async (req, res, next) => {
    try {
        let token;

        // by default token starts with Bearer
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                // get token from header:  split the token into [bearer, token] 

                token = req.headers.authorization.split(' ')[1];

                // verify token
                const decode = jwt.verify(token, process.env.JWT_SECRET);


                // get user from token
                req.user = await UserAuth.findById(decode.id).select('-password');

                next();


            } catch (error) {
                // console.log(error);
                res.status(401);
                throw new Error('Not Authorize');
            }
        }

        if(!token){
            res.status(401);
            throw new Error('Not Authorize , No Tocken');
        }

    } catch (error) {
        // console.log("Error in Middleware" , error);
        res.json({ message: error.message });
    }
}