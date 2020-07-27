import { combineReducers } from 'redux';
import * as ACTIONS from '../actions/actionTypes';
import { getDeck } from '../../api/deckApi';
import { 
  initTiles,
  DEFAULT_DECK,
  DEFAULT_GRID
} from '../../api/boardApi';
import { isMatched } from '../../api/gameApi';

const INITIAL_STATE = {
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
    case ACTIONS.CHANGE_DECK:
      return getDeck(state.id);
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
const gameReducer = (state = INITIAL_STATE, action) => {
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
        })
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
        deck: deckReducer(state.deck, action)
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

const rootReducer = combineReducers({
  deckReducer,
  tileReducer,
  gameReducer
});

// /**
//  * reducer
//  * @param {GameState} state 
//  * @param {GameAction} action 
//  * @returns {GameState}
//  */
// const reducer = (state = INITIAL_STATE, action) => {
//   const { secondFlip, deck, gridSize } = state;
//   switch (action.type) {

//     case ACTIONS.START_GAME:
//       // use action params
//       return {
//         ...INITIAL_STATE,
//         tiles: initTiles(action.gridSize),
//         deck: getDeck(action.deckId)
//       };

//     case ACTIONS.CHANGE_DECK:
//       return { ...state, deck: getDeck(action.deckId) }

//     case ACTIONS.RESIZE_GRID:
//       // resets game
//       return {
//         ...state,
//         gridSize: action.gridSize,
//         tiles: initTiles(action.gridSize),
//         moves: 0,
//         matches: 0,
//         secondFlip: false
//       };

//     case ACTIONS.RESTART_GAME:
//       // use state params
//       return initGame(deck.id, gridSize);

//     case ACTIONS.FLIP_CARD:
//       const items = flip(state, action.index);
//       return {
//         ...state,
//         tiles: items,
//         secondFlip: !secondFlip
//       };
//     case ACTIONS.CHECK_MATCH:
//       return afterSecondFlip(state);

//     case ACTIONS.SHOW_WIN:
//       return checkWin(state);

//     case ACTIONS.SHOW_FACES:
//       return {
//         ...state,
//         tiles: showAllFaces(state.tiles),
//         secondFlip: false
//       };
      
//     default:
//       return state;
//   }
// };

export default rootReducer;