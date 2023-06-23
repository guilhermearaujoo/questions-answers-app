import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import db from './index';
import { Enquete } from '../../types/Enquete';

export type EnqueteInputtableTypes = Optional<Enquete, 'id'>;
type EnqueteSequelizeModelCreator = ModelDefined<Enquete, EnqueteInputtableTypes>;
export type EnqueteSequelizeModel = Model<Enquete, EnqueteInputtableTypes>;

const EnqueteModel: EnqueteSequelizeModelCreator = db.define('Enquete', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  pergunta: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  tableName: 'enquetes',
  timestamps: false,
  underscored: true,
});

export default EnqueteModel;
