
const CLOUD_NAME = 'cantimaginewhy';


const cloudUri = `https://res.cloudinary.com/${CLOUD_NAME}/`;

/**
 * return Cloudinary resource url
 * @param {String} deckId deck id
 * @param {String} imageId cloudinary file name (w/o dir)
 * @param {String} path cloudinary directory
 * @param {int} width image width (px)
 */
export const getCloudImageUrl = (deckId, imageId, path, width = 60) => {
  return `${cloudUri}/w_${width}/${path}/${imageId}`;
}
