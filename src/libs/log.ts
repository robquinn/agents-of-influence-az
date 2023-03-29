export const logFile = ({ op, count, fileName, size }) => {
  console.log(`${op}:\t${count} --> ${fileName} (${size} bytes)`);
};
export const logObj = ({ op, count, firstName, lastName, url }) => {
  console.log(`${op}:\t${count} --> first: ${firstName} last: ${lastName}\n\t${url}`);
};
