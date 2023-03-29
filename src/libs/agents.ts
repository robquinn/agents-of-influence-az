import ConnectAgentsJson from '../data/agents.json';
// import ConnectAgentsJson from '../data/example.json';
import { getSheetValues } from './googleapis';

export const getAgentsWithPhoto = () => {
  return (ConnectAgentsJson as IConnectAgentsJson).data.filter((a) => {
    return a.media.some((m) => m?.category == 'Person Photo');
  });
};

export const extractAgentInfo = (agent) => {
  const headshot = agent?.media?.find((m) => m?.category == 'Person Photo')?.url;
  return { ...agent, headshot };
};

export const getAgentsInSpreadsheetWithPhoto = async () => {
  const agentsOfInfluenceSheet = await getSheetValues();
  return getAgentsWithPhoto().reduce((acc, agent) => {
    const { firstName, lastName } = extractAgentInfo(agent);
    if (
      agentsOfInfluenceSheet.data.some(
        (row) =>
          firstName.toString().trim().includes(row['First Name'].toString().trim()) &&
          lastName.toString().trim().includes(row['Last Name'].toString().trim())
      )
    ) {
      acc.push(agent);
    }
    return acc;
  }, []);
};
