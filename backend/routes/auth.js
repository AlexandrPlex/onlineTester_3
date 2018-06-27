import express from 'express';
import passport from 'passport';
import { authenticationMiddleware } from '../utils';

import { logIn, getRole } from '../controllers/auth';

const router = express.Router();

router.post('/login', passport.authenticate('local'), logIn);

router.get('/role', authenticationMiddleware(), getRole);

export default router;
