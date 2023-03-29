const ConnectAgentsJson = require('../../src/data/agents.json');
const fs = require('fs');
const path = require('path');

const map = {};

// const dfsOfJson = ([json, parent]) => {
//   const [, , number] = parent.split('.');
//   if (number > 0) return;
//   for (const [key, value] of Object.entries(json)) {
//     let newKey = parent + `.${key}`;
//     let newValue = `${typeof value}`;
//     if (typeof value === 'object' && value !== null) {
//       dfsOfJson([value, newKey]);
//     } else {
//       map.set(newKey, newValue);
//     }
//   }
// };
const dfsOfJson = ([json, parent]) => {
  const [, , number] = parent.split('.');
  if (number > 0) return;
  for (const [key, value] of Object.entries(json)) {
    let newKey = parent + `.${key}`;
    let newValue = `${typeof value}`;
    if (typeof value === 'object' && value !== null) {
      dfsOfJson([value, newKey]);
    } else {
      map[newKey] = newValue;
    }
  }
};

function unflatten(data) {
  var result = {};
  for (var i in data) {
    var keys = i.split('.');
    keys.reduce(function (r, e, j) {
      return (
        r[e] || (r[e] = isNaN(Number(keys[j + 1])) ? (keys.length - 1 == j ? data[i] : {}) : [])
      );
    }, result);
  }
  return result;
}

dfsOfJson([ConnectAgentsJson, 'root']);
let sampleJsonObj = unflatten(map);
const pathToWrite = path.join(__dirname, 'agents.sample.json');

fs.promises
  .writeFile(pathToWrite, JSON.stringify(sampleJsonObj))
  .then(() => console.log('Written to file.'));
