# Agents of Influence Photos Automation

Once dependencies are installed, and the build has been run, several different scripts are produced

1. Script that deletes all Headshots uploaded to a specific AWS S3 folder
2. Script that generates a JSON file of the URLs asssociated with headshots on AWS
3. Script that downloads images from URLs, transforms them via a greyscale, and then uploads them to AWS S3
4. Script that downloads images from URLs, transforms them via a greyscale, and then writes them to the local disk
5. Script that downloads images from URLs, , transforms them via a greyscale, and then writes the newly uploaded URLs to a Google Spreadsheet

## Requirements

This repository requires certain files and data to be present to function.

1. Google Service Account credentials in the root of the repo, named `google-sa.json`
2. API data donwloaded in JSON, a sample of which can be found at `src/data/agents.sample.json`
3. Environment Variables in the `.env` file (a sample `.env.example` file is provided for reference)

## Install Dependencies

```bash
npm install

```

## Build

```bash
npm run build
```

## Test

```bash
npm run test
```

## Run Scripts

1. Delete all headshots on specific AWS S3 bucket folder

```bash
npm run scripts:delete-headshots
```

2. Generate JSON associated with uploaded photos to AWS S3

```bash
npm run scripts:generate-json
```

3. Download, transform to greyscale, and upload images to AWS S3

```bash
npm run scripts:upload-aws
```

4. Download, transform to greyscale, and write images to local disk

```bash
npm run scripts:write-disk
```

5. Download, transform to greyscale, and write images to Google Sheet

```bash
npm run scripts:write-sheet
```
