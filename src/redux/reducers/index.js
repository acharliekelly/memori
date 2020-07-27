// import { combineReducers } from 'redux';
import * as ACTIONS from '../actions/actionTypes';
import { getDeck } from '../../api/deckApi';
import { 
  isMatched,
  initTiles,
  DEFAULT_DECK,
  DEFAULT_GRID
} from '../../api/boardApi';

export const INITIAL_STATE = {
  deck: { id: DEFAULT_DECK },
  gridSize: DEFAULT_GRID,
  moves: 0,
  matches: 0,
  tiles: [],  // { value: int, flipped: bool, matched: bool }
  secondFlip: false,
  gameOver: false
};


/**
 * reducer
 * @param {Deck} state 
 * @param {GameAction} action 
 * @returns {Deck}
 */
const deckReducer = (state = INITIAL_STATE.deck, action) => {
  switch (action.type) {
    case ACTIONS.RESTART_GAME:
      return getDeck(state.id);
    case ACTIONS.START_GAME:
    case ACTIONS.CHANGE_DECK:
      return getDeck(action.deckId);
    default:
      return state;
  }
}

/**
 * reducer
 * @param {GameTile[]} state 
 * @param {GameAction} action 
 * @returns {GameTile[]}
 */
const tileReducer = (state = [], action) => {

  switch (action.type) {
    case ACTIONS.START_GAME:
    case ACTIONS.RESIZE_GRID:
      return initTiles(action.gridSize);

    case ACTIONS.CHANGE_DECK:
      // flip all cards down
      return state.map(tile => {
        return {
          ...tile,
          flipped: false,
          matched: false
        }
      });

    case ACTIONS.FLIP_CARD:
      return state.map((tile, index) => {
        if (index === action.index) {
          return {
            ...tile,
            flipped: true
          }
        } else {
          return tile;
        }
      });

    case ACTIONS.CHECK_MATCH:
      if (isMatched(state)) {
        return state.map(tile => {
          return {
            ...tile,
            matched: tile.flipped
          }
        })
      } else {
        return state.map(tile => {
          return {
            ...tile,
            flipped: tile.matched
          }
        })
      };

    case ACTIONS.SHOW_FACES:
      return state.map(tile => {
        return {
          ...tile,
          flipped: true,
          matched: true
        }
      });

    default:
      return state;
  }
}


/**
 * reducer
 * @param {GameState} state 
 * @param {GameAction} action 
 * @returns {GameState}
 */
const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.START_GAME:
      return {
        ...INITIAL_STATE,
        tiles: tileReducer(state.tiles, action),
        deck: deckReducer(state.deck, action)
      };

    case ACTIONS.RESTART_GAME:
      return {
        ...INITIAL_STATE,
        gridSize: state.gridSize,
        tiles: tileReducer([], { 
          type: ACTIONS.START_GAME,
          gridSize: state.gridSize
        }),
        deck: deckReducer(state.deck, action)
      };

    case ACTIONS.RESIZE_GRID:
      return {
        ...state,
        gridSize: action.gridSize,
        tiles: tileReducer(state.tiles, action),
        moves: 0,
        matches: 0,
        secondFlip: false
      };

    case ACTIONS.CHANGE_DECK:
      return {
        ...state,
        deck: deckReducer(state.deck, action),
        tiles: tileReducer(state.tiles, action)
      };

    case ACTIONS.FLIP_CARD:
      return {
        ...state,
        tiles: tileReducer(state.tiles, action),
        secondFlip: !state.secondFlip
      };

    case ACTIONS.CHECK_MATCH:
      const matched = isMatched(state.tiles);
      return {
        ...state,
        moves: state.moves + 1,
        matches: matched ? state.matches + 1 : state.matches,
        tiles: tileReducer(state.tiles, action)
      };

    case ACTIONS.SHOW_FACES:
      return {
        ...state,
        tiles: tileReducer(state.tiles, action)
      };

    case ACTIONS.SHOW_WIN:
      return {
        ...state,
        gameOver: state.tiles.every(tile => tile.matched)
      }
          
    default:
      return state;
  }
}

export default rootReducer;