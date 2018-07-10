/* eslint-disable consistent-return */
import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';

import { db } from './db';
import config from './config.json';

passport.use('local', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  ((username, password, done) => {
    const request = `SELECT users.name, users.email, role.name as role, role.type as role_type, users.id
                          FROM \`${config.mysql.database}\`
                              .\`${config.db_request.user_table}\` 
                     LEFT JOIN \`${config.mysql.database}\`
                              .\`${config.db_request.role_table}\` ON users.role = role.id
               WHERE  \`email\`='${username}' 
             AND \`password\` = '${password}'
             `;
    db.query(request, (error, results) => {
      if (error) throw error;
      if (results.length) {
        return done(null, {
          auth: true,
          id: results[0].id,
          name: results[0].name,
          email: results[0].email,
          role: results[0].role,
          role_type: results[0].role_type,
        });
      }
      return done(null, false);
    });
  }),
));
