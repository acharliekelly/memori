import * as ACTIONS from './actionTypes';

/*
 * Action Creators
 */

export function startGame (deckId, gridSize) {
  return {
    type: ACTIONS.START_GAME,
    deckId,
    gridSize
  }
}

export function restartGame () {
  return { type: ACTIONS.RESTART_GAME };
}

export function changeDeck (deckId) {
  return { type: ACTIONS.CHANGE_DECK, deckId };
}

export function resizeBoard (gridSize) {
  return { type: ACTIONS.RESIZE_GRID, gridSize };
}

export function flipCard (index) {
  return {
    type: ACTIONS.FLIP_CARD,
    index
  };
}

export function checkMatch () {
  return { 
    type: ACTIONS.CHECK_MATCH
  };
}

export function showWin () {
  return { type: ACTIONS.SHOW_WIN };
}
