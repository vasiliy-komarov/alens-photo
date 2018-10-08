import express, {Express} from 'express';
import http from 'http';
import log from './utils/log';
import config from './config.json';
import withRoutes from './routes/routes';

const app: Express = express();

withRoutes(app);

http.createServer(app).listen(config.port, () => {
  log.info(`Express server listening on port: ${config.port}`);
});
