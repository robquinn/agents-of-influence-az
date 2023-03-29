import { logFile, logObj } from '../libs/log';

import { describe, expect, test } from '@jest/globals';

describe('log', () => {
  test('logFile', async () => {
    console.log = jest.fn();
    logFile({
      op: 'Test Log File',
      count: 1,
      fileName: 'Test_File.png',
      size: 10000,
    });

    expect(console.log).toHaveBeenCalledWith(
      `${'Test Log File'}:\t${1} --> ${'Test_File.png'} (${10000} bytes)`
    );
  });
  test('logObj', async () => {
    console.log = jest.fn();
    logObj({
      op: 'Test Log Obj',
      count: 1,
      firstName: 'First',
      lastName: 'Last',
      url: 'https://google.com',
    });

    expect(console.log).toHaveBeenCalledWith(
      `${'Test Log Obj'}:\t${1} --> first: ${'First'} last: ${'Last'}\n\t${'https://google.com'}`
    );
  });
});
