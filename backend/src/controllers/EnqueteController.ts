import { Request, Response } from 'express';
import EnqueteService from '../services/EnqueteService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class EnqueteController {
  constructor(
    private enqueteService = new EnqueteService(),
  ) { }

  public async getAllEnquetes(_req: Request, res: Response) {
    const serviceResponse = await this.enqueteService.getAllEnquetes();
    res.status(200).json(serviceResponse.data);
  }

  public async getRespostaById(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.enqueteService.getEnqueteById(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(200).json(serviceResponse.data);
  }
}
