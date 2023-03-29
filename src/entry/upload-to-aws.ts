import { extractAgentInfo, getAgentsInSpreadsheetWithPhoto } from '../libs/agents';
import { uploadToS3 } from '../libs/aws';
import { logFile } from '../libs/log';
import { standarizeFileName } from '../libs/process';
import { getImg } from '../libs/request';
import { greyscaleImg } from '../libs/sharp';

async function uploadToAWS() {
  let count = 0;
  const agentsInSheetConnect = await getAgentsInSpreadsheetWithPhoto();

  agentsInSheetConnect.forEach(async (agent) => {
    const { firstName, lastName, headshot } = extractAgentInfo(agent);
    const { img, ext, size } = await getImg(headshot);
    const fileName = standarizeFileName({
      firstName,
      lastName,
      ext,
    });

    const blackAndWhite = await greyscaleImg(img);

    uploadToS3({
      fileName: fileName,
      fileBody: blackAndWhite,
      ext: ext,
    }).then(() => {
      count++;
      logFile({ op: 'Img Uploaded to S3', count, fileName, size });
    });
  });
}

uploadToAWS();
