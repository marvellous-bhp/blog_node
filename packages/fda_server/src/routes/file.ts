import express, { Request, Response } from 'express';
import FileController from '../controllers/fileController';

const router = express.Router();

router.post('/upload', FileController.uploadImage);
router.get('/', FileController.getTest);

export default router;
