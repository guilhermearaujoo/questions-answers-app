import { Router } from 'express';
import respostaRouter from './RespostaRouter';
import enqueteRouter from './EnqueteRouter';

const router = Router();

router.use('/respostas', respostaRouter);
router.use('/enquetes', enqueteRouter);

export default router;
