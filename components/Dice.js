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
          <DiceFace value={displayValue} color="#A1887F" />
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
    backgroundColor: '#FFE4E1', // Pinkish beige
    borderWidth: 3,
    borderRadius: 14,
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
