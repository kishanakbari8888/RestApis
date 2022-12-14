
import { ValidationError } from "joi";
import custoerroHandler from "../services/custoerroHandler";

const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    console.log('🧐🧐🧐🧐🧐🧐🧐')
    console.log(err.message);
    console.log('🧐🧐🧐🧐🧐🧐🧐')
    let data = {
        message: 'Internal server error',
    }

    
    if (err instanceof ValidationError) {
        statusCode = 422;
        data = {
            message: err.message
        }
    }
   
    
    if(err instanceof custoerroHandler)
    {
        statusCode = err.status;
        data = {
            message:err.message
        }
    }


    return res.status(statusCode).json(data);
}

export default errorHandler;