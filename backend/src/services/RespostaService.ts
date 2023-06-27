import RespostaModel from '../models/RespostaModel';
import { Resposta } from '../interfaces/resposta/Resposta';
import { IRespostaModel } from '../interfaces/resposta/IRespostaModel';
import { ServiceMessage, ServiceResponse } from '../interfaces/ServiceResponse';
import { NewEntity } from '../interfaces';

export default class BookService {
  constructor(private respostaModel: IRespostaModel = new RespostaModel()) {}

  public async getAllRespostas(): Promise<ServiceResponse<Resposta[]>> {
    const allRespostas = await this.respostaModel.findAll();
    return { status: 'SUCCESSFUL', data: allRespostas };
  }

  public async getRespostaById(id: number): Promise<ServiceResponse<Resposta>> {
    const resposta = await this.respostaModel.findById(id);
    if (!resposta) {
      return {
        status: 'NOT_FOUND',
        data: { message: `Resposta ${id} not found` },
      };
    }
    return { status: 'SUCCESSFUL', data: resposta };
  }

  public async createResposta(
    resposta: NewEntity<Resposta>
  ): Promise<ServiceResponse<Resposta>> {
    const newResposta = await this.respostaModel.create(resposta);
    return { status: 'SUCCESSFUL', data: newResposta };
  }

  public async updateResposta(
    id: number,
    resposta: Resposta
  ): Promise<ServiceResponse<ServiceMessage>> {
    const respostaFound = await this.respostaModel.findById(id);
    if (!respostaFound) {
      return {
        status: 'NOT_FOUND',
        data: { message: `Resposta ${id} not found` },
      };
    }

    const updatedResposta = await this.respostaModel.update(id, resposta);
    if (!updatedResposta) {
      return {
        status: 'CONFLICT',
        data: { message: `There are no updates to perform in Resposta ${id}` },
      };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Resposta updated' } };
  }

  public async deleteResposta(
    id: number
  ): Promise<ServiceResponse<ServiceMessage>> {
    const enqueteFound = await this.respostaModel.findById(id);
    if (!enqueteFound) {
      return {
        status: 'NOT_FOUND',
        data: { message: `Resposta ${id} not found` },
      };
    }

    await this.respostaModel.delete(id);
    return { status: 'SUCCESSFUL', data: { message: 'Resposta deleted' } };
  }
}
