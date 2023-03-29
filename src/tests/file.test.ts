import { describe, expect, test } from '@jest/globals';
import path from 'path';
import { getGoogleServiceAccountFilePath } from '../libs/files';

describe('agents', () => {
  test('getAgentsInSpreadsheetWithPhoto less than 260', async () => {
    const name = 'google-sa.json';
    expect(getGoogleServiceAccountFilePath(name)).toBe(path.join(__dirname, `../../${name}`));
  });
});
