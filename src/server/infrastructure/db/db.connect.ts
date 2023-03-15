import { config } from '../../../config.js';
import mongoose from 'mongoose';
import createDebug from 'debug';

const debug = createDebug('Fntic: dbConnect');

export const dbConnect = (env?: string) => {
  const finalEnv = env || process.env.NODE_ENV;
  const finalDBname =
    finalEnv === 'test' ? config.dbName + '_Testing' : config.dbName;

  const uri = `mongodb+srv://${config.user}:${config.passwd}@${config.cluster}/${finalDBname}?retryWrites=true&w=majority`;
  debug(config.dbName);
  return mongoose.connect(uri);
};
