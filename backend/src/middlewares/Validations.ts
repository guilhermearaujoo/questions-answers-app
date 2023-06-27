import { NextFunction, Request, Response } from 'express';

class Validations {
  static validateEnquete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response | void {
    const enquete = req.body;
    const requiredKeys = ['pergunta'];
    const notFoundKey = requiredKeys.find((key) => !(key in enquete));
    if (notFoundKey) {
      return res.status(400).json({ message: `${notFoundKey} is required` });
    }

    next();
  }

  static validateResposta(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response | void {
    const enquete = req.body;
    const requiredKeys = ['resposta', 'enqueteId'];
    const notFoundKey = requiredKeys.find((key) => !(key in enquete));
    if (notFoundKey) {
      return res.status(400).json({ message: `${notFoundKey} is required` });
    }

    if (typeof enquete.enqueteId !== 'number') {
      return res.status(422).json({ message: 'enqueteId must be a number' });
    }

    next();
  }
}

export default Validations;
