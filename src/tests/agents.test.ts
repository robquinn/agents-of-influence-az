import { describe, expect, test } from '@jest/globals';
import { getAgentsInSpreadsheetWithPhoto } from '../libs/agents';

describe('agents', () => {
  test('getAgentsInSpreadsheetWithPhoto less than 260', async () => {
    expect((await getAgentsInSpreadsheetWithPhoto()).length).toBeLessThan(260);
  });
});
