/* eslint-disable import/first,import/extensions */
import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import 'colors';
import passport from 'passport';
import './passport';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev.babel';

import config from './config.json';
import indexRtr from './routes/index';


const options = {
  host: config.mysql.host,
  port: config.mysql.port,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

const sessionStore = new MySQLStore(options);


const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || config.http_port;
const app = express();

if (isProduction) {
  app.use(helmet());
  app.disable('x-powered-by');
  app.use(logger('combined'));
  app.set('trust proxy', 1);
} else {
  app.use(logger('dev'));
}

app.use(compression());
app.use(bodyParser.json({
  limit: '20mb',
}));
app.use(bodyParser.urlencoded({
  limit: '20mb',
  extended: true,
}));
app.use(cookieParser());
app.use(session({
  store: sessionStore,
  secret: config.session.secret,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: Number(config.session.maxAge), // Время жизни сессии, если убрать станет бесконечным
    httpOnly: !isProduction,
    secure: isProduction,
  },
}));

// api passport

app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// api router
app.use('/api', indexRtr);

const startListenOnPort = () => {
  // Start server listen on specific port
  app.listen(port, (error) => {
    if (error) {
      console.log(`\n${error}`); // eslint-disable-line no-console
    }
    console.log(`\nExpress: Listening on port ${port}, open up http://localhost:${port}/ in your broswer!\n`.green); // eslint-disable-line no-console
  });
};

if (!isProduction) {
  let listend = false;
  const compiler = webpack(webpackConfig);
  const middleware = webpackDevMiddleware(compiler, {
    // The public URL of the output resource directory, should be the same as output.publicPath
    publicPath: webpackConfig.output.publicPath,
    stats: webpackConfig.stats,
  });
  // Serve static files through webpackDevMiddleware
  const distPath = path.resolve(__dirname, '../frontend/dist/dev');
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', (_, res) => {
    res.write(middleware.fileSystem.readFileSync(`${distPath}/index.html`));
    res.end();
  });
  // Start listening on port when webpack has finished compiling
  compiler.plugin('done', () => {
    if (!listend) {
      startListenOnPort();
      listend = true;
    }
  });
} else {
  // Serve static files as usual
  const distPath = path.resolve(__dirname, '../frontend/dist/prod');
  app.use(express.static(distPath));
  app.get('*', (_, res) => {
    res.sendFile(`${distPath}/index.html`);
  });
  startListenOnPort();
}
