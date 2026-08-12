import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence, 
  withRepeat,
  Easing
} from 'react-native-reanimated';
import { COLORS, GLOBAL_PATH, HOME_PATHS, YARD_POSITIONS, BASE_OFFSETS, CELL_SIZE } from '../constants';

const CELL_PCT = 100 / 15; // 6.666%

const getTileCoords = (player, relativePosition, pieceIndex) => {
  let col, row;
  if (relativePosition === -1) {
    [col, row] = YARD_POSITIONS[player][pieceIndex];
  } else if (relativePosition >= 0 && relativePosition <= 50) {
    const globalPos = (BASE_OFFSETS[player] + relativePosition) % 52;
    [col, row] = GLOBAL_PATH[globalPos];
  } else if (relativePosition >= 51 && relativePosition <= 55) {
    [col, row] = HOME_PATHS[player][relativePosition - 51];
  } else if (relativePosition === 56) {
    const offsets = { RED: [6.5, 7], GREEN: [7, 6.5], YELLOW: [7.5, 7], BLUE: [7, 7.5] };
    [col, row] = offsets[player];
  }
  return { col, row };
};

const Token = ({ piece, eligible, onPress, stackOffset }) => {
  const pieceIndex = parseInt(piece.id.split('_')[1]);
  const currentCoords = getTileCoords(piece.player, piece.relativePosition, pieceIndex);
  
  const left = useSharedValue(currentCoords.col * CELL_PCT);
  const top = useSharedValue(currentCoords.row * CELL_PCT);
  const scale = useSharedValue(1);
  const pulse = useSharedValue(1);
  const prevPosition = useRef(piece.relativePosition);

  useEffect(() => {
    if (eligible) {
      pulse.value = withRepeat(
        withTiming(1.2, { duration: 500, easing: Easing.inOut(Easing.ease) }), 
        -1, 
        true
      );
    } else {
      pulse.value = withTiming(1);
    }
  }, [eligible]);

  useEffect(() => {
    if (prevPosition.current !== piece.relativePosition) {
      // Need to animate
      const oldPos = prevPosition.current;
      const newPos = piece.relativePosition;
      
      if (newPos === -1) {
        // Sent back to yard (captured)
        const target = getTileCoords(piece.player, -1, pieceIndex);
        left.value = withTiming(target.col * CELL_PCT, { duration: 400 });
        top.value = withTiming(target.row * CELL_PCT, { duration: 400 });
      } else {
        // Sequential hopping
        let steps = [];
        let start = oldPos === -1 ? 0 : oldPos + 1;
        
        for (let pos = start; pos <= newPos; pos++) {
          const coords = getTileCoords(piece.player, pos, pieceIndex);
          steps.push({
            left: coords.col * CELL_PCT,
            top: coords.row * CELL_PCT
          });
        }

        const runSequence = async () => {
          for (let i = 0; i < steps.length; i++) {
            left.value = withTiming(steps[i].left, { duration: 150 });
            top.value = withTiming(steps[i].top, { duration: 150 });
            // Add a small hop bounce
            scale.value = withSequence(
              withTiming(1.3, { duration: 75 }),
              withTiming(1, { duration: 75 })
            );
            await new Promise(resolve => setTimeout(resolve, 150));
          }
        };
        runSequence();
      }
      prevPosition.current = piece.relativePosition;
    }
  }, [piece.relativePosition]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: `${left.value}%`,
      top: `${top.value}%`,
      transform: [
        { scale: scale.value },
        { scale: pulse.value },
        { translateX: stackOffset.dx },
        { translateY: stackOffset.dy }
      ]
    };
  });

  return (
    <Animated.View style={[styles.tokenContainer, animatedStyle]}>
      <TouchableOpacity 
        activeOpacity={0.8}
        disabled={!eligible}
        onPress={() => onPress(piece.id)}
        style={[styles.token, { backgroundColor: COLORS[piece.player] }]}
      >
        <View style={styles.tokenInner} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const Tokens = ({ pieces, eligiblePieces, onPiecePress }) => {
  // Calculate stacking
  // Group pieces by their exact col/row to apply micro offsets
  const tileGroups = {};
  
  pieces.forEach(piece => {
    if (piece.relativePosition === -1 || piece.relativePosition === 56) return; // Don't stack in yard or home
    const pieceIndex = parseInt(piece.id.split('_')[1]);
    const { col, row } = getTileCoords(piece.player, piece.relativePosition, pieceIndex);
    const key = `${col},${row}`;
    if (!tileGroups[key]) tileGroups[key] = [];
    tileGroups[key].push(piece.id);
  });

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {pieces.map((piece) => {
        const isEligible = eligiblePieces.includes(piece.id);
        
        let stackOffset = { dx: 0, dy: 0 };
        if (piece.relativePosition >= 0 && piece.relativePosition < 56) {
          const pieceIndex = parseInt(piece.id.split('_')[1]);
          const { col, row } = getTileCoords(piece.player, piece.relativePosition, pieceIndex);
          const key = `${col},${row}`;
          const group = tileGroups[key];
          
          if (group && group.length > 1) {
            const index = group.indexOf(piece.id);
            // 2x2 grid offset
            const offsetAmt = 4; // px
            if (index === 0) stackOffset = { dx: -offsetAmt, dy: -offsetAmt };
            if (index === 1) stackOffset = { dx: offsetAmt, dy: -offsetAmt };
            if (index === 2) stackOffset = { dx: -offsetAmt, dy: offsetAmt };
            if (index === 3) stackOffset = { dx: offsetAmt, dy: offsetAmt };
            // Scale them down a bit if stacked, could be handled in token but transform is cleaner
          }
        }

        return (
          <Token 
            key={piece.id}
            piece={piece}
            eligible={isEligible}
            onPress={onPiecePress}
            stackOffset={stackOffset}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tokenContainer: {
    position: 'absolute',
    width: `${100 / 15}%`,
    height: `${100 / 15}%`,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  token: {
    width: '60%',
    height: '60%',
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tokenInner: {
    width: '40%',
    height: '40%',
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  }
});

export default Tokens;
