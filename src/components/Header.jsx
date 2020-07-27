import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

import { GridOptions } from '../api/boardApi';

import '../css/header.scss';

const BoardSizeSelector = ({ updateBoardSize }) => (
  <Dropdown onSelect={updateBoardSize}>
    <Dropdown.Toggle variant="primary">Select Board Size</Dropdown.Toggle>
    <Dropdown.Menu>
      {Object.keys(GridOptions).map(size => (
        <Dropdown.Item key={size} eventKey={size}>{size}</Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
);

const DeckSelector = ({ updateDeck }) => (
  <Dropdown onSelect={updateDeck}>
    <Dropdown.Toggle variant="secondary">Select Deck</Dropdown.Toggle>
    <Dropdown.Menu defaultValue="colors">
      <Dropdown.Item eventKey="colors">Colors</Dropdown.Item>
      <Dropdown.Item eventKey="gray">Greys</Dropdown.Item>
      <Dropdown.Item eventKey="shapes">Shapes</Dropdown.Item>
      <Dropdown.Item eventKey="romanov">Romanov</Dropdown.Item>
      <Dropdown.Item eventKey="tech">Technologies</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

const Header = props => {
  const { boardSize, currentDeck, moves, matches } = props;
  const { updateDeck, updateBoardSize, restartGame } = props;
  return (
    <Container className="header">
      <h1>Memory Game</h1>
      <Row>
        <Col className="size-selector">
          <BoardSizeSelector updateBoardSize={updateBoardSize} />
        </Col>
        <Col />
        <Col className="board-size">
          <span className="label">Board: </span>
          <span className="current-value">{boardSize}</span>
        </Col>
      </Row>
      <Row>
        <Col className="deck-selector">
          <DeckSelector updateDeck={updateDeck} />
        </Col>
        <Col />
        <Col className="deck">
          <span className="label">Deck: </span>
          <span className="current-value">{currentDeck.title}</span>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="danger" onClick={restartGame}>New Game</Button>
        </Col>
        <Col className="moves">
          <span className="label">Moves: </span>
          <span className="current-value">{moves}</span>
        </Col>
        <Col className="matches">
          <span className="label">Matches: </span>
          <span className="current-value">{matches}</span>
        </Col>
      </Row>
    </Container>
  );

} 

export default Header;