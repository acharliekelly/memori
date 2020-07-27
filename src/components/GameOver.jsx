import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const GameOver = ({ restartGame }) => {
  const [ show, setShow ] = useState(true);
  const handleClose = () => setShow(false);
  const restart = () => {
    handleClose();
    restartGame();
  }

  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>You Win!</Modal.Title>
      </Modal.Header>
      <Modal.Body className="justify-content-between">
        <div>Want to play again?</div>
        <Button variant="primary" onClick={restart}>Restart</Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default GameOver;
