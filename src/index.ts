/* eslint-disable import/first */
import env from 'dotenv';
import 'reflect-metadata';

env.config({ path: './.env' });

import { isDevelopment } from './helpers';
import Server from './app';

import cluster from 'cluster';
import os from 'os';

// Postgresql Configuration

// @Service({ global: true })
class AppBoot {
  public startApp = async () => {
    // Start DB session

    if (isDevelopment()) {
      await this.startApplication();
    } else {
      if (cluster.isPrimary) {
        // eslint-disable-next-line no-console
        console.log(`Master ${process.pid} is running`);

        // Fork workers.
        for (let i = 0; i < (await this.getCPUThreads()); i++) {
          cluster.fork();
        }

        cluster.on('exit', worker => {
          // eslint-disable-next-line no-console
          console.log(`worker ${worker.process.pid} died, restarting process`);
          cluster.fork();
        });
      } else {
        await this.startApplication();
      }
    }
  };

  // Handle DB Initialization

  // Run DB Migraations

  // Core Application
  private startApplication = async () => {
    new Promise<void>(resolve => {
      Server.app.listen(
        Number(process.env.PORT) || 3000,
        process.env.IPADDRESS || '0.0.0.0',
        () => {
          // eslint-disable-next-line no-console
          console.log(
            `server started on ${process.env.IPADDRESS}:${process.env.PORT}`,
          );
          resolve();
        },
      );
    });
  };

  private getCPUThreads = async (): Promise<number> => {
    return os.cpus().length;
  };
}

const app = new AppBoot();
app.startApp();
