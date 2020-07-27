import React from 'react';

import Container from 'react-bootstrap/Container';

import Header from '../containers/Header';
import Board from '../containers/Board';


const App = props => {
  return (
    <Container>
      <Header />
      <Board />
    </Container>
  );
};

export default App;