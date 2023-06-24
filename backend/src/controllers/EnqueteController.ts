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

  public async getEnqueteById(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.enqueteService.getEnqueteById(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(200).json(serviceResponse.data);
  }

  public async createEnquete(req: Request, res: Response) {
    const serviceResponse = await this.enqueteService.createEnquete(req.body);
    res.status(201).json(serviceResponse.data);
  }

  public async updateEnquete(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const enquete = req.body;
    const serviceResponse = await this.enqueteService.updateEnquete(id, enquete);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }

  public async deleteEnquete(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const serviceResponse = await this.enqueteService.deleteEnquete(id);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }
}
