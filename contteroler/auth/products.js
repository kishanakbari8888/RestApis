import Joi from 'joi'
import custoerroHandler from '../../services/custoerroHandler';
import {refrecetoken, users,product} from '../../database/index.js';
import bcrypt from 'bcrypt';
import Jwtservice from '../../services/Jwtservice';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});

const handleMultipartData = multer({
    storage,
    limits: { fileSize: 1000000 * 5 },
}).single('image'); // 5mb


const productscon = {

    store: async (req,res,next)=>{
        handleMultipartData(req,res,async (err)=>{
            if(err){
                return next(custoerroHandler.orinalmess(err.message));
            }
            
            // --------------delete Image----------------------------------------
            
            // fs.unlink(`D:\\Javascirt\\Project\\${req.file.path}`, (err) => {
                //     if (err) {
                    //         return next(
                        //             CustomErrorHandler.serverError(err.message)
                        //         );
                        //     }
            // });

            // ----------------delete Image-----------------------------------------

            console.log(req.file);

            const { name, price, size } = req.body;
            let document;
            try {
                document = await product.create({
                    name,
                    price,
                    size,
                    image: req.file.path,
                });
                console.log(document);
            } catch (err) {
                return next(err);
            }
            res.status(201).json(document);
        });
    },

    update:async (req,res,next)=>{
        handleMultipartData(req,res,async (err)=>{
            if(err){
                return next(custoerroHandler.orinalmess(err.message));
            }
            
            console.log(req.file);
            let filepath;
            if(req.file){
                filepath = req.file.path;
            }
        

            const { name, price, size } = req.body;
            let document;
            try {
                document = await product.findOneAndUpdate({_id:req.params.id},{
                    name,
                    price,
                    size,
                    ...(req.file && {image: req.file.path}),
                },{new:true});
                console.log(document);
            } catch (err) {
                return next(err);
            }
            res.status(201).json(document);
        });

    },

    destroy: async (req,res,next){
        
    }




}

export default productscon;

