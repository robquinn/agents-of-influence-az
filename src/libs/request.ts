import axios from 'axios';
import mime from 'mime';

export const getImg = async (url) =>
  axios.get(url, { responseType: 'arraybuffer' }).then((response) => {
    const contentLength = response.headers['content-length'];
    const contentType = response.headers['content-type'];
    const extension = mime.getExtension(contentType);

    return {
      img: Buffer.from(response.data, 'binary'),
      ext: extension,
      size: contentLength,
    };
  });
