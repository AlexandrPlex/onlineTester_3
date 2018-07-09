import express from 'express';
import { authenticationMiddleware } from '../utils';

import { getTestListData, getTestIssues } from '../controllers/student';

const router = express.Router();

router.post('/gettestlist', authenticationMiddleware(), getTestListData);

router.post('/gettestissues', authenticationMiddleware(), getTestIssues);

export default router;
