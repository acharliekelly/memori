import React from 'react';
import ReactCardFlip from 'react-card-flip';
import { 
  getCardBackStyle, 
  getCardFaceStyle
} from '../api/deckApi';

export default ({ index, tile, flipCard, deck }) => (
  <ReactCardFlip
    isFlipped={tile.flipped}
    flipSpeedBackToFront={0.6}
    flipSpeedFrontToBack={0.6}
    flipDirection="horizontal" 
  >
    <div  
      className="card card-back" 
      style={getCardBackStyle(deck)} 
      onClick={() => flipCard(index)} 
    />
    <div  
      className="card card-face" 
      style={getCardFaceStyle(deck, tile)}>
        {deck.showText && (
          <div className="text">{tile.value}</div>
        )}
    </div>
  </ReactCardFlip>
);