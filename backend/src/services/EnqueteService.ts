import EnqueteModel from '../models/EnqueteModel';
import { Enquete } from '../interfaces/enquete/Enquete';
import { IEnqueteModel } from '../interfaces/enquete/IEnqueteModel';
import { ServiceResponse } from '../interfaces/ServiceResponse';
import { NewEntity } from '../interfaces';

export default class EnqueteService {
  constructor(
    private enqueteModel: IEnqueteModel = new EnqueteModel(),
  ) { }

  public async getAllEnquetes(): Promise<ServiceResponse<Enquete[]>> {
    const allEnquetes = await this.enqueteModel.findAll();
    return { status: 'SUCCESSFUL', data: allEnquetes };
  }

  public async getEnqueteById(id: number): Promise<ServiceResponse<Enquete>> {
    const enquete = await this.enqueteModel.findById(id);
    if (!enquete) return { status: 'NOT_FOUND', data: { message: `Enquete ${id} not found` } };
    return { status: 'SUCCESSFUL', data: enquete };
  }

  public async createEnquete(enquete: NewEntity<Enquete>): Promise<ServiceResponse<Enquete>> {
    const newEnquete = await this.enqueteModel.create(enquete);
    return { status: 'SUCCESSFUL', data: newEnquete };
  }
}
