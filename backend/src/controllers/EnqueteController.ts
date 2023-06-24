import { Request, Response } from 'express';
import EnqueteService from '../services/EnqueteService';

export default class EnqueteController {
  constructor(
    private enqueteService = new EnqueteService(),
  ) { }

  public async getAllEnquetes(_req: Request, res: Response) {
    const serviceResponse = await this.enqueteService.getAllEnquetes();
    res.status(200).json(serviceResponse.data);
  }
}
