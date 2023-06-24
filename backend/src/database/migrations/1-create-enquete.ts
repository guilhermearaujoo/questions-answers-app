import { DataTypes, Model, QueryInterface } from 'sequelize';
import { Enquete } from '../../interfaces/enquete/Enquete';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Enquete>>('enquetes', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      pergunta: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('enquetes');
  },
};
