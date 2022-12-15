import Joi from 'joi'
import custoerroHandler from '../../services/custoerroHandler';
import {refrecetoken, users} from '../../database/index.js';
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
            console.log(userd);
            if(!userd)
            {
                next(custoerroHandler.wrongCredentials());
            }
            
            const match = await bcrypt.compare(req.body.password,userd.password)
            
            if(!match)
            {
                return next(custoerroHandler.wrongCredentials());
            }
            

            const access_token = Jwtservice.sign({_id:userd._id,role:userd.role})
            const refresh_token = Jwtservice.sign({_id:userd._id,role:userd.role},'1y','thisisrefresh');

            await refrecetoken.create({token:refresh_token});
            res.json({
                access_token,
                refresh_token
            });
        
        }catch(err)
        {
            return next(err);
        }

    },

    logout: async (req,res,next)=>{

        try{

            await refrecetoken.deleteOne({token:req.body.refresh_token})

        }catch(err){
            return next(err);
        }

        res.json({mess:'succesdfull'});

    }



}

export default logincon;

