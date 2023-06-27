import { Request, Router, Response } from 'express';
import RespostaController from '../controllers/RespostaController';
import Validations from '../middlewares/Validations';

const respostaController = new RespostaController();

const router = Router();

router.get('/:id', (req: Request, res: Response) =>
  respostaController.getRespostaById(req, res));

router.get('/', (req: Request, res: Response) =>
  respostaController.getAllRespostas(req, res));

router.post('/', Validations.validateResposta, (req: Request, res: Response) =>
  respostaController.createResposta(req, res));

router.put(
  '/:id',
  Validations.validateResposta,
  (req: Request, res: Response) => respostaController.updateResposta(req, res),
);

router.delete('/:id', (req: Request, res: Response) =>
  respostaController.deleteResposta(req, res));

export default router;
