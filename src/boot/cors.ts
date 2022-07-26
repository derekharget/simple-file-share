import { corsWhitelist } from './../config';
import cors from 'cors';

export const initCors = () => {
  return cors({
    origin: (origin, callback) => {
      if (corsWhitelist.indexOf(origin as string) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    exposedHeaders:
      'Authorization, Origin, X-Requested-With, X-Request-ID, X-HTTP-Method-Override, Content-Type, Upload-Length, Upload-Offset, Tus-Resumable, Upload-Metadata, Upload-Defer-Length, Upload-Concat, Location',
    maxAge: 86400,
  });
};
