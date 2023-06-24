import { Request, Router, Response } from 'express';
import RespostaController from '../controllers/RespostaController';
import Validations from '../middlewares/Validations';

const respostaController = new RespostaController();

const router = Router();

router.get('/:id', (req: Request, res: Response) => respostaController.getRespostaById(req, res));

router.get('/', (req: Request, res: Response) =>
  respostaController.getAllRespostas(req, res));

router.post(
  '/',
  Validations.validateResposta,
  (req: Request, res: Response) => respostaController.createEnquete(req, res),
);
  
export default router;
