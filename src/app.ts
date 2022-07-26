import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import { initCors } from './boot/cors';
import { fileExists, grabFileStream } from './helpers';
import validator from 'validator';

class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();

    this.app.get('/:authcode/:filename', async (req: Request, res: Response) => {
      const { filename, authcode } = req.params;

      if (!validator.isUUID(authcode)) {
        res.statusCode = 404;
        res.send({ success: 'failed', error: 'Authorization Failed' });
        return;
      }

      if (!fileExists(filename)) {
        res.statusCode = 404;
        res.send({ success: 'failed', error: 'File not found' });
        return;
      }

      res.sendFile(grabFileStream(`/${filename}`));

      return;
    });
  }

  private config = (): void => {
    // Security headers
    this.app.use(helmet());
    this.app.set('trust proxy', true);

    // Cors Configuration
    this.app.use(initCors());
  };
}

export default new Server();
