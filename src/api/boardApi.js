
import { getDeck } from './deckApi';

export const DEFAULT_DECK = 'colors';
export const DEFAULT_GRID = '4x4';

export const GridOptions = {
  '2x2': [2,2],
  '2x4': [2,4],
  '3x4': [3,4],
  '4x4': [4,4],
  '4x5': [4,5],
  '4x6': [4,6],
  '5x6': [5,6]
};



export const GameTile = (cardVal = 0) => ({
  value: cardVal,
  flipped: false,
  matched: false
});

/**
 * The shape of State
 */
export const initialState = {
  deck: {},
  gridSize: DEFAULT_GRID,
  moves: 0,
  matches: 0,
  tiles: [],  // { value: int, flipped: bool, matched: bool }
  secondFlip: false,
  gameOver: false,
  timer: null
};

/**
 * get array of tiles { value: int, flipped: bool, matched: bool }
 * @param {String} gridSize the size of the board, eg '2x2'
 */
export const initTiles = gridSize => {
  const [boardColumns, boardRows] = GridOptions[gridSize];
  const boardSize = boardColumns * boardRows;
  const values = boardSize / 2;
  const tiles = [];
  for (let i=0; i<values; i++) {
    const tile = new GameTile(i);
    // add 2 copies of each
    tiles.push(tile, tile);
  }
  return shuffle(tiles);
}

// Pure
const shuffle = array => {
  const newArray = Array.from(array);
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = temp;
  }
  return newArray;
}

export const initGame = (deckId = DEFAULT_DECK, gridSize = DEFAULT_GRID) => {
  return Object.assign({}, initialState, {
    tiles: initTiles(gridSize),
    deck: getDeck(deckId)
  })
}

