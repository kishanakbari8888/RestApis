import express from 'express';
import { app_port,app_p} from './config';
import router from './Router';
import errorHandler from './middleware/errorHandler.js';
const app = express();

app.use(express.json());



app.use(router);


app.use(errorHandler);




app.listen(app_port,()=>{
    console.log('here we go ${app_port}');
})