import fs from 'fs';
import path from 'path';
import { extractAgentInfo, getAgentsInSpreadsheetWithPhoto } from '../libs/agents';
import { buildUrlAWS, deleteAllHeadshotsS3, buildHeadshotKeyAWS } from '../libs/aws';
import { logObj } from '../libs/log';
import { standarizeFileName } from '../libs/process';
import { getImg } from '../libs/request';
import { makeDirIfNotExist } from '../libs/files';

async function deleteAllHeadshots() {
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

      const Key = buildHeadshotKeyAWS(fileName);
      count++;
      logObj({ op: 'JSON Object Created', count, firstName, lastName, url: Key });
      return { Key };
    })
  )
    .then((objects) => {
      return deleteAllHeadshotsS3(objects);
    })
    .then(() => {
      console.log('Deleted all headshots on AWS S3');
    });
}

deleteAllHeadshots();
