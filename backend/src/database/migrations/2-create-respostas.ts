import { DataTypes, Model, QueryInterface } from 'sequelize';
import { Resposta } from '../../interfaces/Resposta';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Resposta>>('respostas', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      resposta: {
        allowNull: false,
        type: DataTypes.STRING(500),
      },
      enqueteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'enquete_id',
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('respostas');
  },
};
