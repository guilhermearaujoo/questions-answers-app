import { Request, Router, Response } from 'express';
import RespostaController from '../controllers/RespostaController';

const respostaController = new RespostaController();

const router = Router();

router.get('/', (req: Request, res: Response) =>
  respostaController.getAllRespostas(req, res));

export default router;
