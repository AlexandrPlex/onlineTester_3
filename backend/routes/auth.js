import express from 'express';
import passport from 'passport';
import { authenticationMiddleware } from '../utils';

import { logIn, getRole, logOut, failLogIn } from '../controllers/auth';

const router = express.Router();

router.post('/login', passport.authenticate('local',{ failureRedirect: 'loginfalse' }), logIn);

router.get('/loginfalse',  failLogIn);

router.post('/role', authenticationMiddleware(), getRole);

router.post('/logout', authenticationMiddleware(), logOut);
export default router;
