import sharp from 'sharp';

export const greyscaleImg = async (input) => {
  return await sharp(input).greyscale().toBuffer();
};

export const writeImgToFile = async ({ input, filePath }) => {
  return await sharp(input).greyscale().toFile(filePath);
};
