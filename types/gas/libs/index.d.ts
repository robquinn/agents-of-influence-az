interface IGoogleSheetConstructor {
  sheetId: string;
  sheetName: string;
  create: boolean;
}

interface IGoogleSheet {
  getValues(): any[][];
  setValues({ values }: { values: any[][] }): any[][];
}

interface ISheetObject {
  writeData(options): void;
  writeValues(options?): void;
  readValues(): any[][];
}
