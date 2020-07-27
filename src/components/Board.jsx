import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Tile from './Tile';
import GameOver from './GameOver';
import { DEFAULT_DECK, DEFAULT_GRID } from '../api/boardApi';

import '../css/grid.scss';
import '../css/board.scss';

const CHECK_MATCH_TIMER = 1500;

const Board = props => {
  const { deck, tiles, isGameOver, gridSize, isSecondFlip, matches } = props;
  const { flipCard, restartGame, startGame, checkMatch, showWin } = props;
  
  useEffect(() => {
    const deckId = deck ? deck.id : DEFAULT_DECK;
    const size = gridSize || DEFAULT_GRID;
    
    if (!tiles || tiles.length === 0) {
      console.log(`No tiles! starting game with deck "${deckId}" and grid "${size}"`)
      startGame(deckId, size);
    }
  }, [deck, tiles, gridSize, startGame]);

  useEffect(() => {
    if (!isSecondFlip) {
      // second card has been flipped
      setTimeout(checkMatch, CHECK_MATCH_TIMER);
    }
  }, [isSecondFlip, checkMatch]);

  useEffect(() => {
    if (tiles && matches === tiles.length / 2) {
      showWin();
    }
  }, [matches, tiles, showWin]);

  

  const boardCls = `game-board grid-${gridSize}`;
  const boardStyle = { backgroundColor: deck ? deck.background : '#fff' };
  if (!tiles) {
    return <Spinner style={{ marginLeft: "3rem", marginTop: "2rem" }} animation="grow" variant="danger" />
  } else {
    return (
      <Container fluid="xl" className={boardCls} style={boardStyle}>
        {isGameOver && (
          <GameOver restartGame={restartGame} />
        )}
        {tiles.map((tile, index) => (
          <Tile key={index} index={index} tile={tile} flipCard={flipCard} deck={deck} />
        ))}
      </Container>
    )
  }
  
};

export default Board;