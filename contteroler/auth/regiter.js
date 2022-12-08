import Joi from 'joi'
import custoerroHandler from '../../services/custoerroHandler';

const registercon = {

    async register(req,res,next){
        
        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp( 's[a-zA-Z0-9]{3,303}$')).required(),
            repeat_password: Joi.ref('password')
            

        });

        const {error} = registerSchema.validate(req.body);
        console.log(req.body);
        console.log("----------------------------------------");
        console.log(error);
        if(error)
        {
            return next(error);
        }

        
        // try{
            
        //     const exit = await user.exit({email:req.body.email});
        //     if(exit)
        //     {
        //         return next(custoerroHandler.alreadyExist("this email exit in database"));
        //     }
        // }catch(err)
        // {

        // }



        res.json({msg:"hello all"});
    }
}


export default registercon;

