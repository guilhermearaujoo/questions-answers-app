import { Options } from 'sequelize';

const config: Options = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'emepar_db',
  host: process.env.DB_HOST || 'database',
  port: Number(process.env.DB_PORT) || 3306,
  dialect: 'mysql',
};

export = config;
