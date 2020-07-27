import { connect } from "react-redux";
import { 
  restartGame, 
  flipCard,
  startGame,
  checkMatch,
  showWin
} from '../redux/actions';
import { INITIAL_STATE } from '../redux/reducers/';
import Board from '../components/Board';

const mapStateToProps = (state = INITIAL_STATE) => ({
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
  flipCard,
  startGame,
  checkMatch,
  showWin
};

export default connect(mapStateToProps, actionCreators)(Board);