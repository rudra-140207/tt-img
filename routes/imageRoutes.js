import express from 'express';
import { upload, uploadImage, getImage } from '../controllers/imageControllers.js';
const router = express.Router();

router.post('/upload', upload.single('image'), uploadImage);
router.get('/:shortId', getImage);

export default router;
