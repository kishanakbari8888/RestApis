import custoerroHandler from "../services/custoerroHandler";
import Jwtservice from "../services/Jwtservice";

const auth = async (req,res,next)=>{
    let authHeader = req.headers.authorization;
    console.log(authHeader);

    if(!authHeader)
    {
        return next(custoerroHandler.unauthorization());
    }
    
    let token = authHeader.split(' ')[1];

    try{
        
        const {_id,role} = await Jwtservice.verify(token);
        req.user = {
            _id:_id,
            role:role
        }

        next();


    }catch(err){
        return next(custoerroHandler.unauthorization());
    }



}

export default auth;