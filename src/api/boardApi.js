

export const DEFAULT_DECK = 'colors';
export const DEFAULT_GRID = '4x4';

/**
 * Available board sizes
 * @returns {Object<string,[int,int]>}
 */
export const GridOptions = {
  '2x2': [2,2],
  '2x4': [2,4],
  '3x4': [3,4],
  '4x4': [4,4],
  '4x5': [4,5],
  '4x6': [4,6],
  '5x6': [5,6]
};


/**
 * Tile state
 * @param {int} cardVal card value
 * @returns {Object<int,bool,bool>}
 */
export const GameTile = (cardVal = 0) => ({
  value: cardVal,
  flipped: false,
  matched: false
});


/**
 * get flipped tiles
 * @param {GameTile[]} tiles 
 * @returns {GameTile[]}
 */
export const flipped = tiles => {
  return tiles.filter(tile => tile.flipped && !tile.matched);
}
/**
 * return true if exactly 2 tiles are flipped
 * @param {GameTile[]} tiles
 * @returns {boolean}
 */
export const isSecondFlip = tiles => {
  return (flipped(tiles).length === 2);
}

/**
 * return true if exactly 2 tiles are flipped, and match
 * @param {GameTile[]} tiles array of objects {0, false, false}
 * @returns {boolean}
 */
export const isMatched = tiles => {
  const flippedTiles = flipped(tiles);
  return (flippedTiles.length === 2 
    && flippedTiles[0].value === flippedTiles[1].value);
}


/**
 * 
 * @param {string} gridSize 
 * @returns {int} number of tiles
 */
const getNumTiles = gridSize => {
  const [boardColumns, boardRows] = GridOptions[gridSize];
  const boardSize = boardColumns * boardRows;
  return Math.floor(boardSize / 2);
};

/**
 * 
 * @param {GameTile[]} array
 * @returns {GameTile[]}
 */
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

/**
 * get array of tiles
 * @param {string} gridSize the size of the board, eg '2x2'
 * @returns {GameTile[]}
 */
export const initTiles = (gridSize = DEFAULT_GRID) => {
  const tileCount = getNumTiles(gridSize);
  const tiles = [];
  for (let i=0; i<tileCount; i++) {
    const tile = GameTile(i);
    // add 2 copies of each
    tiles.push(tile, tile);
  }
  return shuffle(tiles);
}




