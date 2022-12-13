import express from 'express';
import { app_port,DB_URL} from './config';
import router from './Router';
import errorHandler from './middleware/errorHandler.js';
import mongoose from 'mongoose';
const app = express();
app.use(express.json());

app.use(router);
app.use(errorHandler);


mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) =>{
    app.listen(app_port,()=>{
        console.log('here we go ${app_port}');
    })
}
).catch((err) => console.log(err));