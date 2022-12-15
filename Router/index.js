import express from 'express';

import {registercon,logincon,usercon,refreshcon, productscon} from '../contteroler'
import admin from '../middleware/admin';
import auth from '../middleware/auth';
const router = express.Router();


router.post('/register',registercon.register)
router.post('/login',logincon.login)
router.get('/me',auth,usercon.me)
router.get('/refresh',refreshcon.refresh)
router.post('/logout',logincon.logout)
router.post('/products',[auth,admin],productscon.store)
router.put('/products/:id',[auth,admin],productscon.update)

export default router;