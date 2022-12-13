import Joi from 'joi'
import custoerroHandler from '../../services/custoerroHandler';
// import users from '../../database/index.js';
import bcrypt from 'bcrypt';
import Jwtservice from '../../services/Jwtservice';
import mongoose from 'mongoose';


// --------------------------------------------------------------------------------------------------------------------------------
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // role: { type: String, default: 'customer' },
}, { timestamps: true });

const users = mongoose.model('users', userSchema);



// --------------------------------------------------------------------------------------------------------------------------------
let DB_URL = "mongodb+srv://nodedemo:nodedemo@nodecazzy.zasfn3a.mongodb.net/Demo?retryWrites=true&w=majority";
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB connected...');
});



// --------------------------------------------------------------------------------------------------------------------------------




const registercon = {

    async register(req,res,next){
        
        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('s[a-zA-Z0-9]{3,303}$')).required(),
            repeat_password: Joi.ref('password')
            

        });

        const {error} = registerSchema.validate(req.body);
        console.log(req.body);
        console.log("----------------------------------------");
        
        if(error)
        {
            return next(error);
        }

        
        // try{
            
        //     const exit = await users.exists({email:req.body.email});
        //     if(exit)
        //     {
        //         return next(custoerroHandler.alreadyExist("this email exit in database"));
        //     }
        // }catch(err)
        // {
        //     console.log(err);
        //     return next(err);
        // }

        // Hash password
        const hashpass = await bcrypt.hash(req.body.password,10);

        const user = new users({
            name:req.body.name,
            email:req.body.email,
            password:hashpass
        })

        

        let access_token = 'kishan';
        // try{
            const result = await user.save();
        //     access_token = Jwtservice.sign({_id:result._id,role:result.role})

        // }catch{
        //     return next(err);
        // }









        res.json({access_token:access_token});
    }
}


export default registercon;

