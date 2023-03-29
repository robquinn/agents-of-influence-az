import fs from 'fs';
import path from 'path';

export const fileExists = (path) => {
  return fs.existsSync(path);
};

export const makeDir = (path) => {
  return fs.mkdirSync(path);
};

export const makeDirIfNotExist = (dir) => {
  const imgsDir = path.join(__dirname, dir);
  if (!fileExists(imgsDir)) {
    makeDir(imgsDir);
  }
  return imgsDir;
};

export const getGoogleServiceAccountFilePath = (name) => {
  if (fs.existsSync(path.join(__dirname, `${name}`))) return path.join(__dirname, `${name}`);
  if (fs.existsSync(path.join(__dirname, `../${name}`))) return path.join(__dirname, `../${name}`);
  if (fs.existsSync(path.join(__dirname, `../../${name}`)))
    return path.join(__dirname, `../../${name}`);
  if (fs.existsSync(path.join(__dirname, `../../../${name}`)))
    return path.join(__dirname, `../../../${name}`);
  throw new Error('getGoogleServiceAccountFilePath could not find File');
};
