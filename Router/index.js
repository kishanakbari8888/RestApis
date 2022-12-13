import express from 'express';

import {registercon} from '../contteroler'
import {logincon} from '../contteroler'

const router = express.Router();

router.post('/register',registercon.register)
router.post('/login',logincon.login)


export default router;
