import EnqueteModel from '../models/EnqueteModel';
import { Enquete } from '../interfaces/enquete/Enquete';
import { IEnqueteModel } from '../interfaces/enquete/IEnqueteModel';
import { ServiceMessage, ServiceResponse } from '../interfaces/ServiceResponse';
import { NewEntity } from '../interfaces';

export default class EnqueteService {
  constructor(private enqueteModel: IEnqueteModel = new EnqueteModel()) {}

  public async getAllEnquetes(): Promise<ServiceResponse<Enquete[]>> {
    const allEnquetes = await this.enqueteModel.findAll();
    return { status: 'SUCCESSFUL', data: allEnquetes };
  }

  public async getEnqueteById(id: number): Promise<ServiceResponse<Enquete>> {
    if (Number.isNaN(id)) {
      return {
        status: 'NOT_FOUND',
        data: { message: `Enquete ${id} not found` },
      };
    }
    const enquete = await this.enqueteModel.findById(id);
    if (!enquete) {
      return {
        status: 'NOT_FOUND',
        data: { message: `Enquete ${id} not found` },
      };
    }
    return { status: 'SUCCESSFUL', data: enquete };
  }

  public async createEnquete(
    enquete: NewEntity<Enquete>,
  ): Promise<ServiceResponse<Enquete>> {
    const newEnquete = await this.enqueteModel.create(enquete);
    return { status: 'SUCCESSFUL', data: newEnquete };
  }

  public async updateEnquete(
    id: number,
    enquete: Enquete,
  ): Promise<ServiceResponse<ServiceMessage>> {
    const enqueteFound = await this.enqueteModel.findById(id);
    if (!enqueteFound) {
      return {
        status: 'NOT_FOUND',
        data: { message: `Enquete ${id} not found` },
      };
    }

    const updatedEnquete = await this.enqueteModel.update(id, enquete);
    if (!updatedEnquete) {
      return {
        status: 'CONFLICT',
        data: { message: `There are no updates to perform in Enquete ${id}` },
      };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Enquete updated' } };
  }

  public async deleteEnquete(
    id: number,
  ): Promise<ServiceResponse<ServiceMessage>> {
    const enqueteFound = await this.enqueteModel.findById(id);
    if (!enqueteFound) {
      return {
        status: 'NOT_FOUND',
        data: { message: `Enquete ${id} not found` },
      };
    }

    await this.enqueteModel.delete(id);
    return { status: 'SUCCESSFUL', data: { message: 'Enquete deleted' } };
  }
}
