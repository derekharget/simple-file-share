import path from 'path';
import fs from 'fs';

export const isDevelopment = (): boolean =>
  process.env.NODE_ENV !== 'production';

export const isProduction = (): boolean =>
  process.env.NODE_ENV === 'production';

export const grabFileStream = (location: string): string =>
  path.join(__dirname, '../../files', location);

export const fileExists = (location: string): boolean => {
  if (fs.existsSync(path.join(__dirname, '../../files', location))) {
    return true;
  }

  return false;
};
