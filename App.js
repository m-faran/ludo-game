import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, Dimensions, TouchableOpacity, Text } from 'react-native';
import { createGame, rollDice, getLegalMoves, movePiece } from './engine';
import LudoBoard from './components/LudoBoard';
import Tokens from './components/Tokens';
import Dice from './components/Dice';
import { WinnerModal, MenuModal } from './components/Modals';

export default function App() {
  const [gameState, setGameState] = useState(() => createGame(4));
  const [eligiblePieces, setEligiblePieces] = useState([]);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // Update eligible pieces whenever state changes
  useEffect(() => {
    if (gameState.turnPhase === 'WAITING_FOR_MOVE') {
      const moves = getLegalMoves(gameState);
      setEligiblePieces(moves.map(p => p.id));
      
      // Auto-move if only 1 legal move (per the engine implementation plan)
      // We do it here in the UI layer.
      if (moves.length === 1) {
        setTimeout(() => {
          handlePiecePress(moves[0].id);
        }, 500); // Small delay for UX
      }
    } else {
      setEligiblePieces([]);
    }
  }, [gameState]);

  const handleRollDice = () => {
    if (gameState.turnPhase !== 'WAITING_FOR_ROLL' || gameState.gameOver) return;
    
    // Engine modifies state in place, but React needs a new reference for re-render
    const nextState = rollDice({ ...gameState });
    // Deep copy pieces and players so React notices changes
    nextState.pieces = [...nextState.pieces.map(p => ({...p}))];
    nextState.players = JSON.parse(JSON.stringify(nextState.players));
    setGameState(nextState);
  };

  const handlePiecePress = (pieceId) => {
    if (gameState.turnPhase !== 'WAITING_FOR_MOVE' || !eligiblePieces.includes(pieceId)) return;
    
    const nextState = movePiece({ ...gameState }, pieceId);
    nextState.pieces = [...nextState.pieces.map(p => ({...p}))];
    nextState.players = JSON.parse(JSON.stringify(nextState.players));
    setGameState(nextState);
  };

  const handleNewGame = () => {
    setGameState(createGame(4));
    setIsMenuVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.title}>LUDO</Text>
        <TouchableOpacity style={styles.menuBtn} onPress={() => setIsMenuVisible(true)}>
          <Text style={styles.menuBtnText}>Menu</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.boardContainer}>
        <LudoBoard />
        <Tokens 
          pieces={gameState.pieces} 
          eligiblePieces={eligiblePieces}
          onPiecePress={handlePiecePress} 
        />
      </View>

      <Dice 
        value={gameState.diceValue} 
        activePlayer={gameState.activePlayer}
        onRoll={handleRollDice}
        disabled={gameState.turnPhase !== 'WAITING_FOR_ROLL' || gameState.gameOver}
      />

      <WinnerModal 
        visible={gameState.gameOver} 
        ranks={
          Object.fromEntries(
            Object.entries(gameState.players).map(([player, data]) => [player, data.rank])
          )
        }
        onNewGame={handleNewGame}
      />

      <MenuModal 
        visible={isMenuVisible}
        onResume={() => setIsMenuVisible(false)}
        onNewGame={handleNewGame}
      />
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 2,
    color: '#212121',
  },
  menuBtn: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  menuBtnText: {
    fontWeight: 'bold',
    color: '#424242',
  },
  boardContainer: {
    width: width,
    height: width, // 1:1 aspect ratio
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  }
});
