

/**
 * 
 * @param {Array<Object>} tiles 
 */
export const flipped = tiles => {
  return tiles.filter(tile => tile.flipped && !tile.matched);
}
/**
 * return true if exactly 2 tiles are flipped
 * @param {Array<Object>} tiles array of objects {0, false, false}
 */
export const isSecondFlip = tiles => {
  return (flipped(tiles).length === 2);
}

/**
 * return true if exactly 2 tiles are flipped, and match
 * @param {Array<Object>} tiles array of objects {0, false, false}
 */
export const isMatched = tiles => {
  const fl = flipped(tiles);
  if (fl.length === 2) {
    return fl[0].value === fl[1].value;
  }
  return false;
}

/**
 * return new GameTiles array with unmatched tiles unflipped
 * @param {Array<Object>} tiles 
 */
export const noMatchFound = tiles => {
  const items = Array.from(tiles);
  items.forEach(item => {
    if (item.flipped && !item.matched) item.flipped = false
  });
  return items;
}

/**
 * return new GameTiles array with tiles matched
 * @param {Array<Object>} tiles 
 */
export const matchFound = tiles => {
  const items = Array.from(tiles);
  items.forEach(item => {
    item.matched = item.flipped;
  });
  return items;
}

/**
 * return new GameTiles array with all tiles facing up
 * @param {Array<Object>} tiles 
 */
export const showAllFaces = tiles => {
  const items = Array.from(tiles);
  items.forEach(item => {
    item.flipped = true;
    item.matched = true;
  });
  return items;
}

// TODO: move reducers somewhere (middleware?)

/**
 * reducer - return derived state card flipped
 * @param {Object} state 
 * @param {int} index 
 */
export const flip = (state, index) => {
  const { tiles } = state;
  return tiles.map((item, idx) => {
    if (idx !== index) {
      return item;
    } else {
      return Object.assign({}, item, {
        flipped: true
      })
    }
  })
}

/**
 * reducer - return state after 2nd flip
 * @param {Object} state 
 */
export const afterSecondFlip = state => {
  const { tiles } = state;
  const { moves, matches } = state;
  let nMoves = moves;
  let nMatches = matches;
  let aTiles = [];
  if (tiles.some(tile => tile.flipped)) {
    nMoves += 1;
  }
  if (isMatched(tiles)) {
    nMatches += 1;
    aTiles = matchFound(tiles);
  } else {
    nMatches = matches;
    aTiles = noMatchFound(tiles);
  }
  
  return Object.assign({}, state, {
    moves: nMoves,
    matches: nMatches,
    tiles: aTiles,
    secondFlip: false
  })
}

/**
 * reducer
 * @param {Object} state 
 */
export const checkWin = state => {
  const { tiles } = state;
  return Object.assign({}, state, {
    gameOver: tiles.every(tile => tile.matched)
  })
}

