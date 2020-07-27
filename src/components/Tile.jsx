import React from 'react';
import ReactCardFlip from 'react-card-flip';
import { 
  getCardBackStyle, 
  getCardFrontStyle
} from '../api/deckApi';

export default ({ index, tile, flipCard, deck }) => (
  <ReactCardFlip
    isFlipped={tile.flipped}
    flipSpeedBackToFront={1}
    flipSpeedFrontToBack={1} 
  >
    <div 
      key="front" 
      className="card card-back" 
      style={getCardBackStyle(deck)} 
      onClick={() => flipCard(index)} 
    />
    <div 
      key="back" 
      className="card card-front" 
      style={getCardFrontStyle(deck, tile)}>
        {deck.showText && (
          <div className="text">{tile.value}</div>
        )}
    </div>
  </ReactCardFlip>
);