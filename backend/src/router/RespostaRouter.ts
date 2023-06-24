import { Request, Router, Response } from 'express';
import RespostaController from '../controllers/RespostaController';

const respostaController = new RespostaController();

const router = Router();

router.get('/:id', (req: Request, res: Response) => respostaController.getRespostaById(req, res));

router.get('/', (req: Request, res: Response) =>
  respostaController.getAllRespostas(req, res));
  
export default router;
