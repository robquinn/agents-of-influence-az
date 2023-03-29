import { describe, expect, test } from '@jest/globals';
import mime from 'mime';

import { extractAgentInfo, getAgentsInSpreadsheetWithPhoto } from '../libs/agents';
import { getImg } from '../libs/request';

const testImgData: { ext?: string; size?: number; img?: Buffer; headshot?: string } = {};
const expectedImgData: { ext?: string; size?: number; img?: Buffer } = {};

beforeAll(() =>
  getAgentsInSpreadsheetWithPhoto()
    .then((agents) => extractAgentInfo(agents[0]))
    .then(({ headshot }) => Object.assign(testImgData, { headshot }) && getImg(headshot))
    .then((imgData) => Object.assign(testImgData, imgData) && fetch(testImgData.headshot))
    .then(
      (res) =>
        Object.assign(expectedImgData, {
          ext: mime.getExtension(res.headers.get('content-type')),
          size: res.headers.get('content-length'),
        }) && res.arrayBuffer()
    )
    .then((arrayBuffer) =>
      Object.assign(expectedImgData, {
        img: Buffer.from(arrayBuffer, 'binary'),
      })
    )
);

describe('request', () => {
  test('getImg ext to be jpeg/jpg/png', async () => {
    expect(testImgData.ext).toContain(expectedImgData.ext);
  });
  test(`getImg size to be of size`, async () => {
    expect(testImgData.size).toBe(expectedImgData.size);
  });
  test(`getImg img to be of same type`, async () => {
    expect(testImgData.img).toStrictEqual(expectedImgData.img);
  });
});
