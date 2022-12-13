import {JWT_SECRET} from '../config'
import Jwt from 'jsonwebtoken'

class Jwtservice{

    static sign(payload,expiry = '60s',secret=JWT_SECRET)
    {
        return jwt.sign(payload,secret,{expiresIn:expiry});
    }

}

export default Jwtservice;