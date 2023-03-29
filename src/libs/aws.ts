import {
  PutObjectCommand,
  S3Client,
  ListObjectsCommand,
  DeleteObjectsCommand,
} from '@aws-sdk/client-s3';

const client = new S3Client({
  region: process.env.AWS__REGION,
  credentials: {
    accessKeyId: process.env.AWS__ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS__SECRET_KEY,
  },
});

export const uploadToS3 = async ({ fileName, fileBody, ext }) => {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS__BUCKET_NAME,
    Key: `${process.env.AWS__PATH_PREFIX_HEADSHOTS}/${fileName}`,
    Body: fileBody,
    ContentType: `image/${ext}`,
    // ACL: 'public-read',
  });

  try {
    await client.send(command);
    // const response = await client.send(command);
    // console.log(response);
  } catch (err) {
    console.error(err);
  }
};

export const listAllHeadshotsS3 = async () => {
  const command = new ListObjectsCommand({
    Bucket: process.env.AWS__BUCKET_NAME,
    EncodingType: 'url',
    Prefix: process.env.AWS__PATH_PREFIX_HEADSHOTS,
  });

  try {
    const res = await client.send(command);
    // const response = await client.send(command);
    // console.log(response);
    Promise.resolve(res);
  } catch (err) {
    console.error(err);
    Promise.reject(err);
  }
};

export const deleteAllHeadshotsS3 = async (objects) => {
  const command = new DeleteObjectsCommand({
    Bucket: process.env.AWS__BUCKET_NAME,
    Delete: {
      Objects: objects,
    },
  });

  try {
    const { Deleted } = await client.send(command);
    console.log(`Successfully deleted ${Deleted.length} objects from S3 bucket. Deleted objects:`);
    console.log(Deleted.map((d) => ` • ${d.Key}`).join('\n'));
  } catch (err) {
    console.error(err);
  }
};

export const buildHeadshotKeyAWS = (fileName) => {
  return `${process.env.AWS__PATH_PREFIX_HEADSHOTS}/${fileName}`;
};

export const buildUrlAWS = (fileName?) => {
  return `https://${process.env.AWS__BUCKET_NAME}.s3.${process.env.AWS__REGION}.amazonaws.com/${
    fileName ? process.env.AWS__PATH_PREFIX_HEADSHOTS : process.env.AWS__PATH_PREFIX_RLSIR
  }/${fileName ?? process.env.AWS__DEFAULT_IMG}`;
};
