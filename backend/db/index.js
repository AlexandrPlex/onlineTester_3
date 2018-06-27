import mysql from 'mysql';

import config from '../config.json';

// Create a config to configure both pooling behavior and client options
// all config is optional and the environment variables will be read if the config is not present

const connection = mysql.createConnection({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
});

// Initializes a connection pool
export default connection;
