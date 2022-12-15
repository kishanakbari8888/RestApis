import users from '../database/user';
import custoerroHandler from '../services/custoerroHandler';

const admin = async (req,res,next)=>{

    try{
        const user = await users.findOne({_id:req.user._id});
        console.log(user);
        if(user.role==='admin'){
            console.log('**');
            next();
        }else{
            return next(custoerroHandler.orinalmess('user is not admin'));
        }
    }catch(err){
        console.log('-----------');
        return next(custoerroHandler.orinalmess(err.message));

    }

};


export default admin;