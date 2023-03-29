import fs from 'fs';
import path from 'path';
import { extractAgentInfo, getAgentsInSpreadsheetWithPhoto } from '../libs/agents';
import { buildUrlAWS } from '../libs/aws';
import { logObj } from '../libs/log';
import { standarizeFileName } from '../libs/process';
import { getImg } from '../libs/request';
import { makeDirIfNotExist } from '../libs/files';

async function makeJsonFile() {
  let count = 0;
  const agentsInSheetConnect = await getAgentsInSpreadsheetWithPhoto();

  Promise.all(
    agentsInSheetConnect.map(async (agent) => {
      const { firstName, lastName, headshot } = extractAgentInfo(agent);
      const { ext } = await getImg(headshot);
      const fileName = standarizeFileName({
        firstName,
        lastName,
        ext,
      });

      const url = buildUrlAWS(fileName);
      count++;
      logObj({ op: 'JSON Object Created', count, firstName, lastName, url });
      return { firstName, lastName, url };
    })
  ).then((users) => {
    const dataDir = makeDirIfNotExist('data');
    const usersJsonPath = path.join(dataDir, 'users.json');

    fs.promises
      .writeFile(usersJsonPath, JSON.stringify(users))
      .then(() => console.log('users.json written'))
      .catch((err) => console.log(err));
  });
}

makeJsonFile();
