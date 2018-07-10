import mysql from 'mysql';
import promise_mysql from 'promise-mysql';

import config from '../config.json';

const conf = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

export const db = mysql.createConnection(conf);

export const promiseDB = promise_mysql.createConnection(conf);
