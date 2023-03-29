export const standarizePersonName = (str) => {
  return str
    .replace(/('|")*/gm, '')
    .split(' ')
    .join('_');
};

export const standarizeFileName = ({ firstName, lastName, ext }) => {
  return `${standarizePersonName(firstName)}_${standarizePersonName(lastName)}.${ext}`;
};
