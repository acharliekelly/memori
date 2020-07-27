import { connect } from "react-redux";
import { 
  restartGame, 
  flipCard,
  startGame,
  checkMatch,
  showWin
} from '../redux/actions';
import { initialState } from '../api/boardApi';
import Board from '../components/Board';

const mapStateToProps = (state = initialState) => ({
  deckId: state.deckId,
  deck: state.deck,
  gridSize: state.gridSize,
  tiles: state.tiles,
  isGameOver: state.gameOver,
  isSecondFlip: state.secondFlip,
  matches: state.matches,
  moves: state.moves
});

const actionCreators = {
  restartGame,
  flipTile: flipCard,
  startGame,
  checkMatch,
  showWin
};

export default connect(mapStateToProps, actionCreators)(Board);