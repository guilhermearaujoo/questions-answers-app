import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import SequelizeEnquete from './SequelizeEnquete';

class SequelizeResposta extends Model<InferAttributes<SequelizeResposta>,
InferCreationAttributes<SequelizeResposta>> {
  declare id: CreationOptional<number>;

  declare resposta: string;

  declare enqueteId: number;
}

SequelizeResposta.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  resposta: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  enqueteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'enquete_id',
  },
}, {
  sequelize: db,
  modelName: 'respostas',
  timestamps: false,
});

SequelizeEnquete.hasMany(SequelizeResposta, { foreignKey: 'enqueteId', as: 'respostaIds' });
SequelizeResposta.belongsTo(SequelizeEnquete, { foreignKey: 'enqueteId' });

export default SequelizeResposta;