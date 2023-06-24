import { Request, Router, Response } from 'express';
import EnqueteController from '../controllers/EnqueteController';
import Validations from '../middlewares/Validations';

const enqueteController = new EnqueteController();

const router = Router();

router.get('/:id', (req: Request, res: Response) => enqueteController.getEnqueteById(req, res));

router.get('/', (req: Request, res: Response) =>
  enqueteController.getAllEnquetes(req, res));

router.post(
  '/',
  Validations.validateEnquete,
  (req: Request, res: Response) => enqueteController.createEnquete(req, res),
);

router.put(
  '/:id',
  Validations.validateEnquete,
  (req: Request, res: Response) =>
    enqueteController.updateEnquete(req, res),
);

router.delete(
  '/:id',
  (req: Request, res: Response) => enqueteController.deleteEnquete(req, res),
);

export default router;
