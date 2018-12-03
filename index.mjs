import express from 'express';
import listEndpoints from 'express-list-endpoints';
import winston from 'winston';
import expressWinston from 'express-winston';

import appConfig from './config';

import Cache from './modules/cache';
import check from './routes/check';
import history from './routes/history';

const {
  errorLogging: errorLoggingConfig,
  logging: loggingConfig,
  port,
} = appConfig.server;

const app = express();
const palindromeCache = new Cache(appConfig.history.ttlMinutes * 60);

app.use(expressWinston.logger({
  ...loggingConfig,
  transports: [
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.json(),
  ),
}));

app.get(
  '/check',
  check(palindromeCache),
);

app.get(
  '/history',
  history(palindromeCache, appConfig.history.maxValues),
);

app.use('/app', express.static('./public'));

app.use(expressWinston.errorLogger({
  ...errorLoggingConfig,
  transports: [
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.json(),
  ),
}));

app.listen(port, () => {
  /* eslint-disable no-console */
  console.info(`Tech test is listening on port ${port}`);
  console.info('UI is running at: /app');
  console.info('Available API endpoints are:');
  listEndpoints(app).forEach(
    ({ path, methods }) => methods.forEach(
      method => console.info(`${method} ${path}`),
    ),
  );
  /* eslint-enable no-console */
});
