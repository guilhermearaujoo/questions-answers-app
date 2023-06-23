import { Sequelize } from 'sequelize';
import * as config from '../config/database';

const db = new Sequelize(config);

db.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

export default db;