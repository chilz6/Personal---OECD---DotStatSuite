import debug from 'debug';
import { reduce } from 'ramda';
import initConfig from './init/config';
import initHttp from './init/http';
import initRouter from './init/router';

const loginfo = debug('config');

const ressources = [initRouter, initHttp];
const initRessources = ctx => reduce((acc, initFn) => acc.then(initFn), Promise.resolve(ctx), ressources);

initConfig()
  .then(initRessources)
  .then(({ config }) => console.dir(config, { depth: null }))
  .then(() => loginfo('server started'))
  .catch(console.error); // eslint-disable-line no-console
