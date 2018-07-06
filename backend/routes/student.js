import express from 'express';
import { authenticationMiddleware } from '../utils';

import { getTestListData } from '../controllers/student';

const router = express.Router();

router.post('/gettestlist', authenticationMiddleware(), getTestListData);

export default router;
