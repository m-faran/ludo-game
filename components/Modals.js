import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants';

export const WinnerModal = ({ visible, ranks, onNewGame }) => {
  if (!visible) return null;

  return (
    <Modal transparent animationType="slide" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Game Over!</Text>
          
          <View style={styles.ranksContainer}>
            {Object.entries(ranks)
              .sort(([, a], [, b]) => a - b)
              .map(([player, rank]) => (
                <View key={player} style={styles.rankRow}>
                  <Text style={styles.rankText}>#{rank}</Text>
                  <View style={[styles.playerBadge, { backgroundColor: COLORS[player] }]}>
                    <Text style={styles.playerText}>{player}</Text>
                  </View>
                </View>
              ))}
          </View>

          <TouchableOpacity style={styles.button} onPress={onNewGame}>
            <Text style={styles.buttonText}>Play Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export const MenuModal = ({ visible, onResume, onNewGame }) => {
  if (!visible) return null;

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Paused</Text>
          
          <TouchableOpacity style={[styles.button, styles.resumeBtn]} onPress={onResume}>
            <Text style={styles.buttonText}>Resume</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.button, styles.newGameBtn]} onPress={onNewGame}>
            <Text style={[styles.buttonText, { color: '#E53935' }]}>New Game</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.TEXT,
  },
  ranksContainer: {
    width: '100%',
    marginBottom: 24,
  },
  rankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  rankText: {
    fontSize: 20,
    fontWeight: 'bold',
    width: 40,
    color: '#757575',
  },
  playerBadge: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  playerText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: COLORS.GREEN,
    marginVertical: 8,
  },
  resumeBtn: {
    backgroundColor: COLORS.BLUE,
  },
  newGameBtn: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.RED,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
