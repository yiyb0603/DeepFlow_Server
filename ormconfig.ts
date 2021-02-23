import { join } from 'path';
import { ConnectionOptions } from 'typeorm';

const ormConfig: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'test',
  synchronize: true,
  logging: false,
	entities: [__dirname + '/../**/*.entity.{js,ts}'],
	charset: 'utf8mb4_unicode_ci',
};

export default ormConfig;