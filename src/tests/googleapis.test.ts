import { getSheetValues } from '../libs/googleapis';

import { describe, expect, test } from '@jest/globals';

describe('googleapis', () => {
  test('getSheetValues to be less than 260', async () => {
    expect((await getSheetValues()).data.length).toBeLessThan(260);
  });
});
