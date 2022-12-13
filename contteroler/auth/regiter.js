import Joi from 'joi'
import custoerroHandler from '../../services/custoerroHandler';
import {users} from '../../database/index.js';
import bcrypt from 'bcrypt';
import Jwtservice from '../../services/Jwtservice';
import mongoose from 'mongoose';


const registercon = {

    register:async (req,res,next)=>{
        
        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('s[a-zA-Z0-9]{3,303}$')).required(),
            repeat_password: Joi.ref('password')
            

        });

        const {error} = registerSchema.validate(req.body);
        console.log(req.body);
        
        if(error)
        {
            return next(error);
        }

        
        try{
            const exit = await users.exists({email:req.body.email});
            if(exit)
            {
                console.log('emailid exists _id is' + (exit._id));
                return next(custoerroHandler.alreadyExist("this email exit in database"));
            }
        }catch(err)
        {
            console.log(err);
            return next(err);
        }

        // Hash password
        const hashpass = await bcrypt.hash(req.body.password,10);

        const user = new users({
            name:req.body.name,
            email:req.body.email,
            password:hashpass
        })

        

        let access_token = 'kishan';
        try{
            const result = await user.save();
            console.log(result);
            access_token = Jwtservice.sign({_id:result._id,role:result.role})
        }catch(err){
            return next(err);
        }





        res.json({access_token:access_token});
    }
}

export default registercon;

