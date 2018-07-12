import express from 'express';

import authRtr from './auth';
import studentRtr from './student';

const router = express.Router();

router.use('/auth', authRtr);

router.use('/student', studentRtr);

export default router;
