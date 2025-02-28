import fs from 'fs';
import path from 'path';

export const loadConfig = () => {
  const configFilePath = path.resolve(process.cwd(), 'config.json');
  const configFile = fs.readFileSync(configFilePath);
  return JSON.parse(configFile);
};
