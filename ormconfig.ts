import { ConnectionOptions } from 'typeorm';
import getProcessEnv from 'lib/getProcessEnv';

const ormConfig: ConnectionOptions = {
  type: 'mysql',
  host: getProcessEnv('DB_HOST'),
  port: Number(getProcessEnv('DB_PORT')),
  username: getProcessEnv('DB_USERNAME'),
  password: getProcessEnv('DB_PASSWORD'),
  database: getProcessEnv('DATABASE'),
  synchronize: true,
  logging: false,
	entities: [__dirname + '/../**/*.entity.{js,ts}'],
	charset: 'utf8mb4_unicode_ci',
};

export default ormConfig;