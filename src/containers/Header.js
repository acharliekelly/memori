import { connect } from "react-redux";
import { 
  changeDeck,
  resizeBoard,
  restartGame,
  showFaces
} from '../redux/actions/';
import { initialState } from '../api/boardApi';
import Header from '../components/Header';

const mapStateToProps = (state = initialState) => ({
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