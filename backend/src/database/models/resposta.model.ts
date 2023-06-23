import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import db from './index';
import { Resposta } from '../../types/Resposta';
import Enquete from './enquete.model';

export type RespostaInputtableTypes = Optional<Resposta, 'id'>;
type RespostaSequelizeModelCreator = ModelDefined<Resposta, RespostaInputtableTypes>;
export type RespostaSequelizeModel = Model<Resposta, RespostaInputtableTypes>;

const RespostaModel: RespostaSequelizeModelCreator = db.define('Resposta', {
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
  },
}, {
  tableName: 'Respostas',
  timestamps: false,
  underscored: true,
});

Enquete.hasMany(RespostaModel, { foreignKey: 'enqueteId', as: 'respostaIds' });
RespostaModel.belongsTo(Enquete, { foreignKey: 'enqueteId' });

export default RespostaModel;
