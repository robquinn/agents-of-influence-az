import path from 'path';
import { extractAgentInfo, getAgentsInSpreadsheetWithPhoto } from '../libs/agents';
import { makeDirIfNotExist } from '../libs/files';
import { logFile } from '../libs/log';
import { standarizeFileName } from '../libs/process';
import { getImg } from '../libs/request';
import { writeImgToFile } from '../libs/sharp';

async function writeImgsToFiles() {
  let count = 0;

  const imgsDir = makeDirIfNotExist('imgs');
  const agentsInSheetConnect = await getAgentsInSpreadsheetWithPhoto();

  agentsInSheetConnect.forEach(async (acc, agent) => {
    const { firstName, lastName, headshot } = extractAgentInfo(agent);
    const { img, ext, size } = await getImg(headshot);
    const fileName = standarizeFileName({
      firstName,
      lastName,
      ext,
    });

    const filePath = path.join(imgsDir, fileName);

    writeImgToFile({
      input: img,
      filePath,
    }).then(() => {
      count++;
      logFile({ op: 'Img Written to File', count, fileName, size });
    });
  });
}

writeImgsToFiles();
