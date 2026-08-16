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

import Dice1 from '../assets/01.svg';
import Dice2 from '../assets/02.svg';
import Dice3 from '../assets/03.svg';
import Dice4 from '../assets/04.svg';
import Dice5 from '../assets/05.svg';
import Dice6 from '../assets/06.svg';

const DiceFaces = {
  1: Dice1,
  2: Dice2,
  3: Dice3,
  4: Dice4,
  5: Dice5,
  6: Dice6,
};

const DiceFace = ({ value }) => {
  const Face = DiceFaces[value] || Dice1;
  return (
    <View style={styles.diceFace}>
      <Face width="100%" height="100%" />
    </View>
  );
};

const Dice = ({ value, isActive, onRoll, disabled }) => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const pointerOffset = useSharedValue(0);
  const [displayValue, setDisplayValue] = useState(value || 1);

  useEffect(() => {
    if (value !== null) {
      setDisplayValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (isActive && !disabled) {
      pointerOffset.value = withRepeat(
        withSequence(
          withTiming(10, { duration: 400 }),
          withTiming(0, { duration: 400 })
        ),
        -1,
        true
      );
    } else {
      pointerOffset.value = 0;
    }
  }, [isActive, disabled]);

  const handlePress = () => {
    if (disabled || !isActive) return;
    
    rotation.value = withSequence(
      withTiming(360, { duration: 400, easing: Easing.linear }),
      withTiming(720, { duration: 400, easing: Easing.out(Easing.ease) })
    );
    scale.value = withSequence(
      withTiming(1.3, { duration: 400 }),
      withTiming(1, { duration: 400 })
    );

    setTimeout(() => {
      rotation.value = 0;
      onRoll();
    }, 800);
  };

  const animatedDiceStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value}deg` },
        { scale: scale.value }
      ],
      opacity: isActive ? 1 : 0.6,
    };
  });

  const animatedPointerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: pointerOffset.value }],
      opacity: isActive && !disabled ? 1 : 0,
    };
  });

  return (
    <View style={styles.container}>
      {/* Orange pointer arrow (left of dice) */}
      <Animated.View style={[styles.pointer, animatedPointerStyle]}>
        <View style={styles.arrowRight} />
      </Animated.View>

      <Animated.View style={animatedDiceStyle}>
        <TouchableOpacity 
          activeOpacity={0.8} 
          onPress={handlePress}
          disabled={disabled || !isActive}
        >
          <DiceFace value={displayValue} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  pointer: {
    marginRight: 10,
  },
  arrowRight: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 0,
    borderBottomWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: '#FF9800', // Orange pointer
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  diceFace: {
    width: 60,
    height: 60,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
});

export default Dice;
