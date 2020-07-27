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
  checkWin,
  showAllFaces
} from '../../api/gameApi';

  
const reducer = (state = initialState, action) => {
  const { secondFlip } = state;
  switch (action.type) {

    case ACTIONS.START_GAME:
      // use action params
      return initGame(action.deckId, action.gridSize);

    case ACTIONS.CHANGE_DECK:
      return Object.assign({}, state, {
        deck: getDeck(action.deckId)
      });

    case ACTIONS.RESIZE_GRID:
      // resets game
      return Object.assign({}, state, {
        gridSize: action.gridSize,
        tiles: initTiles(action.gridSize),
        moves: 0,
        matches: 0,
        secondFlip: false
      });

    case ACTIONS.RESTART_GAME:
      // use state params
      return initGame(state.deck.id, state.gridSize);

    case ACTIONS.FLIP_CARD:
      const items = flip(state, action.index);
      return Object.assign({}, state, {
        tiles: items,
        secondFlip: !secondFlip
      });
    case ACTIONS.CHECK_MATCH:
      return afterSecondFlip(state);

    case ACTIONS.SHOW_WIN:
      return checkWin(state);

    case ACTIONS.SHOW_FACES:
      return Object.assign({}, state, {
        tiles: showAllFaces(state.tiles),
        secondFlip: false
      });
      
    default:
      return state;
  }
};

export default reducer;