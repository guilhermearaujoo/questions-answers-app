import SequelizeEnquete from '../database/models/SequelizeEnquete';
import { Enquete } from '../interfaces/enquete/Enquete';
import { IEnqueteModel } from '../interfaces/enquete/IEnqueteModel';
import { NewEntity } from '../interfaces';

export default class EnqueteModel implements IEnqueteModel {
  private model = SequelizeEnquete;

  async findAll(): Promise<Enquete[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, pergunta }) => (
      { id, pergunta }
    ));
  }

  async findById(id: Enquete['id']): Promise<Enquete | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;

    const { pergunta }: Enquete = dbData;
    return { id, pergunta };
  }

  async create(data: NewEntity<Enquete>): Promise<Enquete> {
    const dbData = await this.model.create(data);

    const { id, pergunta }: Enquete = dbData;
    return { id, pergunta };
  }

  async update(id: Enquete['id'], data: Partial<NewEntity<Enquete>>): Promise<Enquete | null> {
    const [affectedRows] = await this.model.update(data, { where: { id } });
    if (affectedRows === 0) return null;

    return this.findById(id);
  }

  async delete(id: Enquete['id']): Promise<number> {
    return this.model.destroy({ where: { id } });
  }
}
