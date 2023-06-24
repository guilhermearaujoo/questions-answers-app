import { Request, Router, Response } from 'express';
import EnqueteController from '../controllers/EnqueteController';

const enqueteController = new EnqueteController();

const router = Router();

router.get('/:id', (req: Request, res: Response) => enqueteController.getRespostaById(req, res));

router.get('/', (req: Request, res: Response) =>
  enqueteController.getAllEnquetes(req, res));

export default router;
