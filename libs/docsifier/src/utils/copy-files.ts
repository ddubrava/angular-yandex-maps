import * as fs from 'fs';
import * as path from 'path';

export const copyFiles = (source: string, destination: string) => {
  const files = fs.readdirSync(source);

  files.forEach((file) => {
    console.log(source, destination, file);

    fs.copyFileSync(path.join(source, file), path.join(destination, file));
  });
};
