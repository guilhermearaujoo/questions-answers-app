import { Router } from 'express';
import respostaRouter from './RespostaRouter';

const router = Router();

router.use('/respostas', respostaRouter);

export default router;
