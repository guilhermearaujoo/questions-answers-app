import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class SequelizeEnquete extends Model<
  InferAttributes<SequelizeEnquete>,
  InferCreationAttributes<SequelizeEnquete>
> {
  declare id: CreationOptional<number>;

  declare pergunta: string;
}

SequelizeEnquete.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    pergunta: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'enquetes',
    timestamps: false,
  }
);

export default SequelizeEnquete;
