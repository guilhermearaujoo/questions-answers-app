import RespostaModel from '../models/RespostaModel';
import { Resposta } from '../interfaces/resposta/Resposta';
import { IRespostaModel } from '../interfaces/resposta/IRespostaModel';
import { ServiceResponse } from '../interfaces/ServiceResponse';

export default class BookService {
  constructor(
    private respostaModel: IRespostaModel = new RespostaModel(),
  ) { }

  public async getAllRespostas(): Promise<ServiceResponse<Resposta[]>> {
    const allRespostas = await this.respostaModel.findAll();
    return { status: 'SUCCESSFUL', data: allRespostas };
  }

  public async getRespostaById(id: number): Promise<ServiceResponse<Resposta>> {
    const resposta = await this.respostaModel.findById(id);
    if (!resposta) return { status: 'NOT_FOUND', data: { message: `Resposta ${id} not found` } };
    return { status: 'SUCCESSFUL', data: resposta };
  }
}
