import {JWT_SECRET} from '../config'
import jwt from 'jsonwebtoken'



class Jwtservice{

    // enconde
    static sign(payload,expiry = '1y',secret=JWT_SECRET)
    {
        return jwt.sign(payload,secret,{expiresIn:expiry});
    }

    // decodey
    static verify(token,secret)
    {
        return jwt.verify(token,secret);
    }

}


export default Jwtservice;
