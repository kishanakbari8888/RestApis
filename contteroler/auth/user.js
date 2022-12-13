import Joi from 'joi'
import custoerroHandler from '../../services/custoerroHandler';
import {users} from '../../database/index.js';
import bcrypt from 'bcrypt';
import Jwtservice from '../../services/Jwtservice';
import mongoose from 'mongoose';



const usercon = {

    me:async (req,res,next)=>{
        
        try{
            console.log(req.user);
            const user =  await users.findOne({_id:req.user._id}).select('-__v -updatedAt -createdAt -password ');
            if(!user){
                return next(custoerroHandler.notFound());
            }
            
            res.json(user);

        }catch(err){
            return next(err);
        }
       

    }
}

export default usercon;

