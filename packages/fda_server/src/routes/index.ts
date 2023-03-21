import express, { Request, Response } from 'express';

import file from './file';

const router = express.Router();

router.use('/file', file);

export default router;
