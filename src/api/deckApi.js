import { getCloudImageUrl } from './imageApi';
import { decks } from './deck.json';

/**
 * return Deck object
 * @param {Object} deckId 
 */
export const getDeck = deckId => {
  return decks[deckId];
}

/**
 * return image src URL
 * @param {Object} deck 
 * @param {int} cardValue 
 */
export const getCloudFace = (deck, cardValue) => {
  const image = deck.faces[cardValue];
  return getCloudImageUrl(deck.id, image, deck.imgWidth);
}

/**
 * return image src URL
 * @param {Object} deck 
 */
export const getCloudBack = deck => {
  return getCloudImageUrl(deck.id, deck.cardBack, deck.imgWidth);
}

/**
 * return style object
 * @param {Object} deck 
 * @param {Object} tile 
 */
export const getCardStyle = (deck, tile) => {
  return tile.flipped ?
    getCardFrontStyle(deck, tile) : getCardBackStyle(deck);
}

/**
 * return style object
 * @param {Object} deck 
 * @param {Object} tile 
 */
export const getCardFrontStyle = (deck, tile) => {
  const style = Object.assign({}, deck.cardStyle);
  style.opacity = tile.matched ? 0.7 : 1;
  
  if (deck.hasImages) {
    // images
    const img = getCloudFace(deck, tile.value);
    style.backgroundColor = deck.background;
    style.backgroundImage = `url(${img})`;
  } else {
    // color
    style.backgroundColor = deck.faces[tile.value];
  }
  return style;
}

/**
 * return style object
 * @param {Object} deck 
 */
export const getCardBackStyle = deck => {
  // show back
  const style = Object.assign({}, deck.cardStyle);
  if (deck.cardBack.startsWith('#')) {
    style.backgroundColor = deck.cardBack;
  } else {
    // cardBack is image
    const img = getCloudBack(deck);
    style.backgroundColor = deck.background;
    style.backgroundImage = `url(${img}`;
  }
  return style;
}
