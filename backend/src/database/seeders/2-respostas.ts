import { QueryInterface } from 'sequelize';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.bulkInsert(
      'respostas',
      [
        {
          resposta: 'Vermelho',
          enquete_id: 1,
        },
        {
          resposta: 'Azul',
          enquete_id: 1,
        },
        {
          resposta: 'Verde',
          enquete_id: 1,
        },
        {
          resposta: 'Cachorro',
          enquete_id: 2,
        },
        {
          resposta: 'Gato',
          enquete_id: 2,
        },
      ],
      {}
    );
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.bulkDelete('respostas', {});
  },
};
