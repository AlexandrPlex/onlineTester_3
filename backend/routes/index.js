import express from 'express';

import authRtr from './auth';

const router = express.Router();

router.use('/auth', authRtr);

export default router;
