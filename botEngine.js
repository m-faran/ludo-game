import { SAFE_TILES, BASE_OFFSETS } from './constants';
import { getLegalMoves } from './engine';

export function getBestBotMove(state) {
  const legalMoves = getLegalMoves(state);
  
  if (legalMoves.length === 0) {
    return null;
  }
  
  if (legalMoves.length === 1) {
    return legalMoves[0].id;
  }

  let bestMove = null;
  let maxScore = -Infinity;

  legalMoves.forEach(piece => {
    let score = 0;
    const isDeploying = piece.relativePosition === -1;
    const newRelativePosition = isDeploying ? 0 : piece.relativePosition + state.diceValue;
    
    // Deploying a piece from the yard
    if (isDeploying) {
      score += 15;
    }
    
    // Reaching the destination
    if (newRelativePosition === 56) {
      score += 40;
    }
    
    // Entering the home path (safe from captures)
    if (newRelativePosition >= 51 && piece.relativePosition < 51) {
      score += 30;
    }
    
    // Only calculate global position if it's on the main track (0-50)
    if (newRelativePosition >= 0 && newRelativePosition <= 50) {
      const newGlobalPos = (BASE_OFFSETS[piece.player] + newRelativePosition) % 52;
      
      // Moving to a safe tile
      if (SAFE_TILES.has(newGlobalPos)) {
        score += 20;
      }
      
      // Capturing an enemy
      if (!SAFE_TILES.has(newGlobalPos)) {
        const enemies = state.pieces.filter(p => {
          if (p.player === piece.player) return false;
          if (p.relativePosition < 0 || p.relativePosition > 50) return false;
          const enemyGlobalPos = (BASE_OFFSETS[p.player] + p.relativePosition) % 52;
          return enemyGlobalPos === newGlobalPos;
        });
        
        if (enemies.length > 0) {
          score += 50;
        }
      }
    }
    
    // Progress tie-breaker (prefer moving pieces that are further along)
    score += newRelativePosition * 0.1;

    if (score > maxScore) {
      maxScore = score;
      bestMove = piece.id;
    }
  });

  return bestMove;
}
