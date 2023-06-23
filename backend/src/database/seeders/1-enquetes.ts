import { QueryInterface } from 'sequelize';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.bulkInsert('enquetes', [
      {
        pergunta: 'Qual é a sua cor favorita?',
      },
      {
        pergunta: 'Qual é o seu animal favorito?',
      },
    ], {});
  },
  
  down(queryInterface: QueryInterface) {
    return queryInterface.bulkDelete('enquetes', {});
  },
};
