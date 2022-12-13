import express from 'express';

import {registercon,logincon,usercon} from '../contteroler'
import auth from '../middleware/auth';
const router = express.Router();


router.post('/register',registercon.register)
router.post('/login',logincon.login)
router.get('/me',auth,usercon.me)
// router.get('/me',usercon.me)

export default router;