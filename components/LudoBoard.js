import React from 'react';
import { View, StyleSheet } from 'react-native';
import BoardSvg from '../assets/Ludo Board Game Illustration.svg';

const LudoBoard = () => {
  return (
    <View style={styles.container}>
      <BoardSvg width="100%" height="100%" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 1,
    position: 'absolute',
    top: 0,
    left: 0,
  }
});

export default LudoBoard;
