import { connect } from "react-redux";
import { 
  changeDeck,
  resizeBoard,
  restartGame,
  showFaces
} from '../redux/actions/';
import { INITIAL_STATE } from '../redux/reducers/';
import Header from '../components/Header';

const mapStateToProps = (state = INITIAL_STATE) => ({
  boardSize: state.gridSize,
  currentDeck: state.deck,
  moves: state.moves,
  matches: state.matches
});

const actionCreators = {
  updateDeck: changeDeck, 
  updateBoardSize: resizeBoard,
  restartGame,
  showFaces
};

export default connect(mapStateToProps, actionCreators)(Header);