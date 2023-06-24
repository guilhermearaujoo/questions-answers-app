import { Request, Response } from 'express';
import RespostaService from '../services/RespostaService';

export default class BookController {
  constructor(
    private respostaService = new RespostaService(),
  ) { }

  public async getAllRespostas(_req: Request, res: Response) {
    const serviceResponse = await this.respostaService.getAllRespostas();
    res.status(200).json(serviceResponse.data);
  }
}
