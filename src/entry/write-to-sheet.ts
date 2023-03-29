import { extractAgentInfo, getAgentsInSpreadsheetWithPhoto } from '../libs/agents';
import { buildUrlAWS } from '../libs/aws';
import { getSheetValues, writeValuesToSheet } from '../libs/googleapis';
import { logObj } from '../libs/log';
import { standarizeFileName } from '../libs/process';
import { getImg } from '../libs/request';

async function writeToSheet() {
  let count = 0;
  const agentsInSheetGoogle = await getSheetValues();
  const agentsInSheetConnect = await getAgentsInSpreadsheetWithPhoto();
  Promise.all(
    agentsInSheetGoogle.data.map(async (agentData) => {
      const agent = agentsInSheetConnect.find(
        (a) =>
          a.firstName.includes(agentData['First Name']) &&
          a.lastName.includes(agentData['Last Name'])
      );

      let url;

      if (agent) {
        const { firstName, lastName, headshot } = extractAgentInfo(agent);
        const { ext } = await getImg(headshot);
        const fileName = standarizeFileName({
          firstName,
          lastName,
          ext,
        });
        url = buildUrlAWS(fileName);
      } else {
        url = buildUrlAWS();
      }

      count++;
      logObj({
        op: 'Create Sheet Record',
        count,
        firstName: agentData['First Name'],
        lastName: agentData['Last Name'],
        url,
      });
      return [
        agentData['Office'],
        agentData['First Name'],
        agentData['Last Name'],
        agentData['Units'],
        agentData['Sales Volume'],
        agentData['GCI'],
        agentData['Category'],
        url,
      ];
    })
  )
    .then((users) => {
      users.unshift(agentsInSheetGoogle.headers);
      return writeValuesToSheet(users);
    })
    .then(() => console.log('Values Written to Sheet'));
}

writeToSheet();
