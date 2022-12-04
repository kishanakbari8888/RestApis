import Joi from 'joi'

const registercon = {

    async register(req,res,next){
        
        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp( 's[a-zA-Z0-9]{3,303$')).required(),
            repeat_password: Joi.ref('password')
        });

        const {error} = registerSchema.validate(req.body);
        console.log(req.body);
        console.log(error);
        if(error)
        {
            return next(error);
        }

        res.json({msg:"hello all"});
    }
}


export default registercon;

