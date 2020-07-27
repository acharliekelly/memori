import { getCloudImageUrl } from './imageApi';
import { decks } from './deck.json';

// opacity for matched tiles
const MATCHED_OPACITY = 0.7;

/**
 * return Deck
 * @param {string} deckId
 * @returns {Deck}
 */
export const getDeck = deckId => {
  return decks[deckId];
}

const defaultDeckStyle = ({
  backgroundColor: '#f00'
});

/**
 * return image src URL
 * @param {Deck} deck 
 * @param {int} cardValue 
 * @returns {URL}
 */
export const getCloudFace = (deck, cardValue) => {
  const image = deck.faces[cardValue];
  return getCloudImageUrl(deck.id, image, deck.path, deck.imgWidth);
}

/**
 * return image src URL
 * @param {Deck} deck 
 * @returns {URL}
 */
export const getCloudBack = deck => {
  return getCloudImageUrl(deck.id, deck.cardBack, deck.path, deck.imgWidth);
}

/**
 * return style object
 * @param {Deck} deck 
 * @param {GameTile} tile 
 * @returns {Object} style
 */
export const getCardStyle = (deck, tile) => {
  return tile.flipped ?
    getCardFaceStyle(deck, tile) : getCardBackStyle(deck);
}

/**
 * return style object
 * @param {Deck} deck 
 * @param {GameTile} tile 
 * @returns {Object} style
 */
export const getCardFaceStyle = (deck, tile) => {
  // first check if deck is hydrated
  if (!deck.title) return defaultDeckStyle;

  const style = Object.assign({}, deck.cardStyle);
  style.opacity = tile.matched ? MATCHED_OPACITY : 1;

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
 * @param {Deck} deck 
 * @returns {Object} style 
 */
export const getCardBackStyle = deck => {
  // first check if deck is hydrated
  if (!deck.title) return defaultDeckStyle;

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
