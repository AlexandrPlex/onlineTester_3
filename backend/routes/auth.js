import express from 'express';
import passport from 'passport';
import { authenticationMiddleware } from '../utils';

import { logIn, getRole, logOut } from '../controllers/auth';

const router = express.Router();

router.post('/login', passport.authenticate('local'), logIn);

router.post('/role', authenticationMiddleware(), getRole);

router.post('/logout', authenticationMiddleware(), logOut);
export default router;
