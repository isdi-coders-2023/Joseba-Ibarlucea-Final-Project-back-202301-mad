import { config } from '../../../config.js';
import mongoose from 'mongoose';
import createDebug from 'debug';

const debug = createDebug('Fntic: dnConnect');

export const dbConnect = (env?: string) => {
  const finalEnv = env || process.env.NODE_ENV;
  const finalDBname =
    finalEnv === 'test' ? config.dbName + '_Testing' : config.dbName;

  const uri = `mongodb+srv://${config.user}:${config.passwd}@${config.cluster}/${config.dbName}?retryWrites=true&w=majority`;
  debug(uri);
  return mongoose.connect(uri);
};
