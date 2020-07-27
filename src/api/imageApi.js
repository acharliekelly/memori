
const CLOUD_NAME = 'cantimaginewhy';


const cloudUri = `https://res.cloudinary.com/${CLOUD_NAME}/`;

export const getCloudImageUrl = (deckId, imageId, width = 60) => {
  return `${cloudUri}/w_${width}/memory/decks/${deckId}/${imageId}`;
}