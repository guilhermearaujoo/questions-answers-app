import SequelizeResposta from '../database/models/SequelizeResposta';
import { Resposta } from '../interfaces/resposta/Resposta';
import { IRespostaModel } from '../interfaces/resposta/IRespostaModel';
import { NewEntity } from '../interfaces';

export default class RespostaModel implements IRespostaModel {
  private model = SequelizeResposta;

  async findAll(): Promise<Resposta[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, resposta, enqueteId }) => ({
      id,
      resposta,
      enqueteId,
    }));
  }

  async findById(id: Resposta['id']): Promise<Resposta | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;

    const { resposta, enqueteId }: Resposta = dbData;
    return { id, resposta, enqueteId };
  }

  async create(data: NewEntity<Resposta>): Promise<Resposta> {
    const dbData = await this.model.create(data);

    const { id, resposta, enqueteId }: Resposta = dbData;
    return { id, resposta, enqueteId };
  }

  async update(
    id: Resposta['id'],
    data: Partial<NewEntity<Resposta>>,
  ): Promise<Resposta | null> {
    const [affectedRows] = await this.model.update(data, { where: { id } });
    if (affectedRows === 0) return null;

    return this.findById(id);
  }

  async delete(id: Resposta['id']): Promise<number> {
    return this.model.destroy({ where: { id } });
  }
}
