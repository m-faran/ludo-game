import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence,
  withRepeat,
  Easing
} from 'react-native-reanimated';
import { COLORS } from '../constants';

const DiceFace = ({ value, color }) => {
  // Simple rendering of dots based on value 1-6
  const getDots = () => {
    switch (value) {
      case 1: return <View style={styles.dotCenter} />;
      case 2: return <><View style={styles.dotTopLeft} /><View style={styles.dotBottomRight} /></>;
      case 3: return <><View style={styles.dotTopLeft} /><View style={styles.dotCenter} /><View style={styles.dotBottomRight} /></>;
      case 4: return <><View style={styles.dotTopLeft} /><View style={styles.dotTopRight} /><View style={styles.dotBottomLeft} /><View style={styles.dotBottomRight} /></>;
      case 5: return <><View style={styles.dotTopLeft} /><View style={styles.dotTopRight} /><View style={styles.dotCenter} /><View style={styles.dotBottomLeft} /><View style={styles.dotBottomRight} /></>;
      case 6: return <><View style={styles.dotTopLeft} /><View style={styles.dotTopRight} /><View style={styles.dotMiddleLeft} /><View style={styles.dotMiddleRight} /><View style={styles.dotBottomLeft} /><View style={styles.dotBottomRight} /></>;
      default: return null;
    }
  };

  return (
    <View style={[styles.diceFace, { borderColor: color }]}>
      {getDots()}
    </View>
  );
};

const Dice = ({ value, activePlayer, onRoll, disabled }) => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const [displayValue, setDisplayValue] = useState(value || 6);

  useEffect(() => {
    if (value !== null) {
      setDisplayValue(value);
    }
  }, [value]);

  const handlePress = () => {
    if (disabled) return;
    
    // Animate roll
    rotation.value = withSequence(
      withTiming(360, { duration: 400, easing: Easing.linear }),
      withTiming(720, { duration: 400, easing: Easing.out(Easing.ease) })
    );
    scale.value = withSequence(
      withTiming(1.3, { duration: 400 }),
      withTiming(1, { duration: 400 })
    );

    // After animation, trigger onRoll
    setTimeout(() => {
      rotation.value = 0;
      onRoll();
    }, 800);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value}deg` },
        { scale: scale.value }
      ]
    };
  });

  return (
    <View style={styles.container}>
      <Text style={[styles.playerText, { color: COLORS[activePlayer] }]}>
        {activePlayer}'s Turn
      </Text>
      
      <Animated.View style={animatedStyle}>
        <TouchableOpacity 
          activeOpacity={0.8} 
          onPress={handlePress}
          disabled={disabled}
        >
          <DiceFace value={displayValue} color={COLORS[activePlayer]} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  playerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  diceFace: {
    width: 60,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderWidth: 4,
    borderRadius: 12,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#212121',
    position: 'absolute',
  },
  dotCenter: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#212121', position: 'absolute', top: 20, left: 20 },
  dotTopLeft: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#212121', position: 'absolute', top: 8, left: 8 },
  dotTopRight: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#212121', position: 'absolute', top: 8, right: 8 },
  dotBottomLeft: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#212121', position: 'absolute', bottom: 8, left: 8 },
  dotBottomRight: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#212121', position: 'absolute', bottom: 8, right: 8 },
  dotMiddleLeft: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#212121', position: 'absolute', top: 20, left: 8 },
  dotMiddleRight: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#212121', position: 'absolute', top: 20, right: 8 },
});

export default Dice;
