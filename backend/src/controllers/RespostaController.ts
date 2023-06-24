import { Request, Response } from 'express';
import RespostaService from '../services/RespostaService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class BookController {
  constructor(
    private respostaService = new RespostaService(),
  ) { }

  public async getAllRespostas(_req: Request, res: Response) {
    const serviceResponse = await this.respostaService.getAllRespostas();
    res.status(200).json(serviceResponse.data);
  }

  public async getRespostaById(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.respostaService.getRespostaById(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(200).json(serviceResponse.data);
  }

  public async createResposta(req: Request, res: Response) {
    const serviceResponse = await this.respostaService.createResposta(req.body);
    res.status(201).json(serviceResponse.data);
  }

  public async updateResposta(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const resposta = req.body;
    const serviceResponse = await this.respostaService.updateResposta(id, resposta);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }
}
