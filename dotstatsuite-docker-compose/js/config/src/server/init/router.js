import debug from 'debug';
import express from 'express';
import logger from 'morgan-debug';
import path from 'path';

const loginfo = debug('config:express');
const startTime = new Date();
const init = ctx => {
  const app = express();
  const {
    config: { gitHash },
  } = ctx;
  app.use('/ping', (req, res) => res.json({ ping: 'pong' }));
  app.use('/healthcheck', (req, res) => res.json({ gitHash, startTime }));
  app.use(logger('config:http', 'dev'));
  app.use('/configs', express.static(path.join(__dirname, '../../../configs')));
  app.use('/assets', express.static(path.join(__dirname, '../../../assets')));
  loginfo('routes setup');
  return Promise.resolve({ ...ctx, app });
};

module.exports = init;
