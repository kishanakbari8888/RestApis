import Joi from 'joi'
import custoerroHandler from '../../services/custoerroHandler';
import {users} from '../../database/index.js';
import bcrypt from 'bcrypt';
import Jwtservice from '../../services/Jwtservice';
import mongoose from 'mongoose';


const logincon = {

    login:async (req,res,next)=>{
        
        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('s[a-zA-Z0-9]{3,303}$')).required(),
        });

        const {error} = loginSchema.validate(req.body);
        console.log(req.body);
        
        if(error)
        {
            return next(error);
        }

        
        try{
            const userd = await users.findOne({email:req.body.email});
            if(!userd)
            {
                next(custoerroHandler.wrongCredentials());
            }
            
            const match = await bcrypt.compare(req.body.password,userd.password)
            
            if(!match)
            {
                return next(custoerroHandler.wrongCredentials());
            }
            

            let access_token = Jwtservice.sign({_id:userd._id,role:userd.role})
            res.json({access_token:access_token});
        
        }catch(err)
        {
            return next(err);
        }

    }
}

export default logincon;

