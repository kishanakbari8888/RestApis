import express from 'express';

import {registercon} from '../contteroler'

const router = express.Router();

router.post('/register',registercon.register)


export default router;
