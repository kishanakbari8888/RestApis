import express from 'express';

import {registercon,logincon,usercon,refreshcon} from '../contteroler'
import auth from '../middleware/auth';
const router = express.Router();


router.post('/register',registercon.register)
router.post('/login',logincon.login)
router.get('/me',auth,usercon.me)
router.get('/refresh',refreshcon.refresh)

export default router;