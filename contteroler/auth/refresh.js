import Joi from 'joi'
import custoerroHandler from '../../services/custoerroHandler';
import {refrecetoken, users} from '../../database/index.js';
import bcrypt from 'bcrypt';
import Jwtservice from '../../services/Jwtservice';
import mongoose from 'mongoose';


const refreshcon = {

    refresh:async (req,res,next)=>{
        
        const refreshschme = Joi.object({
            refresh_token: Joi.string().required()
        });

        const {error} = refreshschme.validate(req.body);
        
        if(error)
        {
            return next(error);
        }

        
        let refreshtoken;
        try{
            
            refreshtoken = await refrecetoken.findOne({token:req.body.refresh_token});
            if(!refreshtoken){
                return next(custoerroHandler.unauthorization('invalid refresh token'));
            }   
            
            let Uid;
            try{
                const aa =  await Jwtservice.verify(refreshtoken.token,'thisisrefresh');
                Uid = aa._id;
            }catch(err){
                return next(custoerroHandler.unauthorization('invalid refresh token'));
            }
            
            const user = await users.findOne({_id:Uid});
            if(!user){
                return next(custoerroHandler.unauthorization('No user found! '));
            }
            
            let access_token = Jwtservice.sign({_id:user._id,role:user.role})
            let refresh_token = Jwtservice.sign({_id:user._id,role:user.role},'1y','thisisrefresh');
            
            await refrecetoken.create({token:refresh_token});
            res.json({
                access_token:access_token,
                refresh_token:refresh_token
            });

        }catch(err)
        {   
            return next(new Error('somethig went wrong' + err.message)); 
        }



    }
}

export default refreshcon;

