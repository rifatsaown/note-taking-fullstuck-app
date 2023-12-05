import express from 'express';
import basicController from '../controller/basicController';

const router = express.Router();

router.get('/notes', basicController.getNotes);
router.post('/notes', basicController.addNote);
router.delete('/notes/:id', basicController.deleteNote);

export default router;