import { ConnectionOptions } from 'typeorm';
import getProcessEnv from 'lib/getProcessEnv';

const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: getProcessEnv('DB_HOST'),
  port: Number(getProcessEnv('DB_PORT')),
  username: getProcessEnv('DB_USERNAME'),
  password: getProcessEnv('DB_PASSWORD'),
  database: getProcessEnv('DATABASE'),
  synchronize: true,
  logging: false,
  entities: ["src/modules/domain-invoice/*.entity{.ts,.js}"],
};

export default ormConfig;