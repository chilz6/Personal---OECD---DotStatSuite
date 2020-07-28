import debug from 'debug';
import params from '../params';

const loginfo = debug('config');

const init = () => {
  loginfo(`running "${params.env}" env`);
  return Promise.resolve({ config: params });
};

export default init;
