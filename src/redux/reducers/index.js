import * as ACTIONS from '../actions/actionTypes';
import { getDeck } from '../../api/deckApi';
import { 
  initTiles,
  initialState,
  initGame
} from '../../api/boardApi';
import {
  flip,
  afterSecondFlip,
  checkWin
} from '../../api/gameApi';

  
const reducer = (state = initialState, action) => {
  const { secondFlip } = state;
  switch (action.type) {

    case ACTIONS.START_GAME:
      return initGame(action.deckId, action.gridSize);

    case ACTIONS.CHANGE_DECK:
      return Object.assign({}, state, {
        deckId: action.deckId,
        deck: getDeck(action.deckId)
      });

    case ACTIONS.RESIZE_GRID:
      // automatically resets game
      return Object.assign({}, state, {
        gridSize: action.gridSize,
        tiles: initTiles(action.gridSize)
      });

    case ACTIONS.RESTART_GAME:
      return initGame(state.deck.id, state.gridSize);

    case ACTIONS.FLIP_CARD:
      const items = flip(state, action.index);
      if (!secondFlip) {
        // first flip
        return Object.assign({}, state, {
          tiles: items,
          secondFlip: true
        })
      } else {
        // second flip
        return Object.assign({}, state, {
          tiles: items,
          secondFlip: false
        })
      }

    case ACTIONS.CHECK_MATCH:
      return afterSecondFlip(state);

    case ACTIONS.SHOW_WIN:
      return checkWin(state);

    default:
      return state;
  }
};

export default reducer;