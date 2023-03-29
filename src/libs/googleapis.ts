// import fs from 'fs';
import path from 'path';
import process from 'process';
// import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import { getGoogleServiceAccountFilePath } from './files';

const auth = async () => {
  const keyFile = getGoogleServiceAccountFilePath('google-sa.json');
  const auth = new google.auth.GoogleAuth({
    keyFile: keyFile, //the key file
    //url to spreadsheets API
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });
  return await auth.getClient();
};

const getSheet = async () => {
  const googleAuth = await auth();
  const googleSheetsInstance = google.sheets({ version: 'v4', auth: googleAuth });

  //write data into the google sheets
  return await googleSheetsInstance.spreadsheets.values.get({
    auth: googleAuth, //auth object
    spreadsheetId: process.env.AGENTS_OF_INFLUENCE_COPY__SHEET_ID, //spreadsheet id
    range: `${process.env.AGENTS_OF_INFLUENCE_COPY__SHEET_NAME}!${process.env.AGENTS_OF_INFLUENCE_COPY__COL_RANGE}`, //sheet name and range of cells
  });
};

export const writeValuesToSheet = async (values) => {
  const googleAuth = await auth();
  const googleSheetsInstance = google.sheets({ version: 'v4', auth: googleAuth });

  await googleSheetsInstance.spreadsheets.values.clear({
    spreadsheetId: process.env.AGENTS_OF_INFLUENCE_COPY__SHEET_ID,
    range: `${process.env.AGENTS_OF_INFLUENCE_COPY__SHEET_NAME}!${process.env.AGENTS_OF_INFLUENCE_COPY__COL_RANGE}`,
  });

  return await googleSheetsInstance.spreadsheets.values.append({
    auth: googleAuth,
    valueInputOption: 'USER_ENTERED',
    spreadsheetId: process.env.AGENTS_OF_INFLUENCE_COPY__SHEET_ID,
    range: `${process.env.AGENTS_OF_INFLUENCE_COPY__SHEET_NAME}!${process.env.AGENTS_OF_INFLUENCE_COPY__COL_RANGE}`,
    requestBody: {
      values: values,
    },
  });
};

const objectifySheetValues = (values) => {
  const [headers, ...data] = values;
  return {
    data: data.map((row) =>
      headers.reduce((p, c, i) => {
        // console.log('p',p, 'c',c,'i',i)
        p[c.toString().trim()] = row[i];
        return p;
      }, {})
    ),
    headers: headers.map((h) => h.toString().trim()),
  };
};

export const getSheetValues = async () => {
  const res = await getSheet();
  const rows = res.data.values;
  return objectifySheetValues(rows);
};
