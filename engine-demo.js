const { createGame, rollDice, getLegalMoves, movePiece } = require('./engine.js');
const assert = require('assert');

function runDemo() {
  console.log('Running Ludo Engine Demo...');
  let state = createGame(2); // RED and GREEN

  // Test 1: Rolling a non-6 when pieces are in yard
  state = rollDice(state, 4);
  assert.strictEqual(state.diceValue, 4, 'Dice value should be 4');
  assert.strictEqual(state.turnPhase, 'WAITING_FOR_ROLL', 'Turn should pass since no legal moves');
  assert.strictEqual(state.activePlayer, 'GREEN', 'Turn should pass to GREEN');

  // Test 2: Rolling a 6 to enter
  state = rollDice(state, 6);
  assert.strictEqual(state.turnPhase, 'WAITING_FOR_MOVE', 'GREEN should be waiting for move');
  assert.strictEqual(state.consecutiveSixes, 1, 'Consecutive sixes should be 1');
  
  const greenMoves = getLegalMoves(state);
  assert.strictEqual(greenMoves.length, 4, 'Should have 4 legal moves to enter');
  
  state = movePiece(state, 'GREEN_0');
  assert.strictEqual(state.pieces.find(p => p.id === 'GREEN_0').relativePosition, 0, 'GREEN_0 should be at 0');
  assert.strictEqual(state.activePlayer, 'GREEN', 'GREEN gets an extra roll for 6');
  assert.strictEqual(state.turnPhase, 'WAITING_FOR_ROLL', 'GREEN should be waiting to roll again');

  // Test 3: Capture logic
  // GREEN_0 is at relative 0. Green's offset is 13. So global is 13 (a safe zone).
  // Let's move GREEN_0 to relative 1 (global 14, unsafe).
  state = rollDice(state, 1);
  state = movePiece(state, 'GREEN_0');
  assert.strictEqual(state.activePlayer, 'RED', 'Turn passes to RED');
  assert.strictEqual(state.pieces.find(p => p.id === 'GREEN_0').relativePosition, 1, 'GREEN_0 at rel 1');

  // Now RED needs to get to global 14. Red's offset is 0. So Red needs relative 14.
  // We'll give RED a 6 to enter, then 14 to move.
  state = rollDice(state, 6);
  state = movePiece(state, 'RED_0');
  assert.strictEqual(state.pieces.find(p => p.id === 'RED_0').relativePosition, 0);

  // RED needs 14. Let's give RED a 6 and an 8.
  state = rollDice(state, 6);
  state = movePiece(state, 'RED_0'); // RED_0 is at rel 6
  
  // RED gets another turn for rolling 6
  state = rollDice(state, 4);
  state = movePiece(state, 'RED_0'); // RED_0 is at rel 10 (global 10)
  assert.strictEqual(state.activePlayer, 'GREEN', 'Turn passes to GREEN');
  
  // GREEN turn, green skips
  state = rollDice(state, 1);
  state = movePiece(state, 'GREEN_0'); // GREEN_0 at rel 2 (global 15)
  
  // RED turn, needs 5 to capture (global 15)
  state = rollDice(state, 5);
  state = movePiece(state, 'RED_0'); // Capture should happen!
  
  assert.strictEqual(state.pieces.find(p => p.id === 'GREEN_0').relativePosition, -1, 'GREEN_0 should be captured (sent back to yard)');
  assert.strictEqual(state.activePlayer, 'RED', 'RED gets extra roll for capture');
  
  // Test 4: Consecutive sixes
  state = rollDice(state, 6);
  state = movePiece(state, 'RED_0');
  assert.strictEqual(state.consecutiveSixes, 1);
  
  state = rollDice(state, 6);
  state = movePiece(state, 'RED_0');
  assert.strictEqual(state.consecutiveSixes, 2);
  
  // Third six
  const beforeThirdSixActive = state.activePlayer;
  state = rollDice(state, 6);
  assert.strictEqual(state.consecutiveSixes, 0, 'Should reset to 0 upon passing turn');
  assert.strictEqual(state.activePlayer, 'GREEN', 'Turn passes to GREEN on 3rd 6');
  
  // Test 5: Winning a piece
  // We will cheat and move GREEN_1 to 55, then roll a 1
  state.pieces.find(p => p.id === 'GREEN_1').relativePosition = 55;
  state = rollDice(state, 1);
  state = movePiece(state, 'GREEN_1');
  
  assert.strictEqual(state.pieces.find(p => p.id === 'GREEN_1').relativePosition, 56, 'GREEN_1 should reach home');
  assert.strictEqual(state.players['GREEN'].completedPieces, 1, 'GREEN should have 1 completed piece');
  assert.strictEqual(state.activePlayer, 'GREEN', 'GREEN gets extra roll for reaching home');

  // Test 6: Check Game Over
  // Move 3 more green pieces to 56
  state.pieces.find(p => p.id === 'GREEN_2').relativePosition = 55;
  state = rollDice(state, 1);
  state = movePiece(state, 'GREEN_2');

  state.pieces.find(p => p.id === 'GREEN_3').relativePosition = 55;
  state = rollDice(state, 1);
  state = movePiece(state, 'GREEN_3');

  state.pieces.find(p => p.id === 'GREEN_0').relativePosition = 55;
  state = rollDice(state, 1);
  state = movePiece(state, 'GREEN_0');

  assert.strictEqual(state.players['GREEN'].status, 'FINISHED');
  assert.strictEqual(state.players['GREEN'].rank, 1);
  assert.strictEqual(state.gameOver, true);
  assert.strictEqual(state.players['RED'].status, 'FINISHED');
  assert.strictEqual(state.players['RED'].rank, 2);

  console.log('All tests passed!');
}

runDemo();
