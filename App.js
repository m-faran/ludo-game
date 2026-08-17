import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, Dimensions, TouchableOpacity, Text } from 'react-native';
import { createGame, rollDice, getLegalMoves, movePiece } from './engine';
import LudoBoard from './components/LudoBoard';
import Tokens from './components/Tokens';
import Dice from './components/Dice';
import { Image } from 'react-native';
import HomeScreen from './screens/homeScreen';
import SettingsScreen from './screens/settingsScreen';
import SplashScreen from './screens/splashScreen';
import { getBestBotMove } from './botEngine';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { supabase } from './supabase';
import { multiplayer } from './multiplayer';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [appState, setAppState] = useState('SPLASH'); // 'SPLASH', 'HOME', 'GAME', 'SETTINGS'
  const [gameMode, setGameMode] = useState('PASS_N_PLAY'); // 'PASS_N_PLAY', 'VS_COMPUTER', 'ONLINE'
  const [gameState, setGameState] = useState(() => createGame(4));
  const [eligiblePieces, setEligiblePieces] = useState([]);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  
  // Supabase Auth State
  const [session, setSession] = useState(null);
  const [username, setUsername] = useState('Guest');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) fetchProfile(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setUsername('Guest');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId) => {
    const { data } = await supabase.from('profiles').select('username').eq('id', userId).single();
    if (data?.username) {
      setUsername(data.username);
    } else {
      const defaultName = 'Player_' + Math.floor(Math.random() * 10000);
      await supabase.from('profiles').upsert({ id: userId, username: defaultName });
      setUsername(defaultName);
    }
    multiplayer.init(userId);
  };

  const handleGoogleLogin = async () => {
    try {
      const redirectUrl = AuthSession.makeRedirectUri();
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          skipBrowserRedirect: true,
        },
      });
      if (error) throw error;
      if (data?.url) {
        const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUrl);
        if (result.type === 'success' && result.url) {
          await supabase.auth.getSessionFromUrl({ url: result.url });
        }
      }
    } catch (e) {
      console.error(e);
      alert('Login Failed');
    }
  };

  // Update eligible pieces whenever state changes
  useEffect(() => {
    if (gameState.turnPhase === 'WAITING_FOR_MOVE') {
      const moves = getLegalMoves(gameState);
      setEligiblePieces(moves.map(p => p.id));
      
      // Auto-move if only 1 legal move (per the engine implementation plan)
      // Only auto-move for human players here, bot logic handles its own moves
      const isBot = gameState.players[gameState.activePlayer]?.isBot;
      if (moves.length === 1 && !isBot) {
        setTimeout(() => {
          handlePiecePress(moves[0].id);
        }, 500); // Small delay for UX
      }
    } else {
      setEligiblePieces([]);
    }
  }, [gameState]);

  // Handle Bot Turns
  useEffect(() => {
    if (gameState.gameOver || appState !== 'GAME') return;

    const activePlayerId = gameState.activePlayer;
    const isBot = gameState.players[activePlayerId]?.isBot;

    if (isBot) {
      if (gameState.turnPhase === 'WAITING_FOR_ROLL') {
        const timerId = setTimeout(() => {
          handleRollDice();
        }, 600);
        return () => clearTimeout(timerId);
      } else if (gameState.turnPhase === 'WAITING_FOR_MOVE') {
        const bestMoveId = getBestBotMove(gameState);
        if (bestMoveId) {
          const timerId = setTimeout(() => {
            handlePiecePress(bestMoveId);
          }, 600);
          return () => clearTimeout(timerId);
        }
      }
    }
  }, [gameState, appState]);

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
    if (gameState.turnPhase !== 'WAITING_FOR_MOVE') return;
    
    // Check if the piece is actually a legal move right now
    const legalMoves = getLegalMoves(gameState);
    if (!legalMoves.some(p => p.id === pieceId)) return;
    
    const nextState = movePiece({ ...gameState }, pieceId);
    nextState.pieces = [...nextState.pieces.map(p => ({...p}))];
    nextState.players = JSON.parse(JSON.stringify(nextState.players));
    setGameState(nextState);
  };

  const handleNewGame = () => {
    if (gameMode === 'VS_COMPUTER') {
      setGameState(createGame(4, ['GREEN', 'YELLOW', 'BLUE']));
    } else {
      setGameState(createGame(4));
    }
    setIsMenuVisible(false);
  };

  const handleExitToHome = () => {
    setIsMenuVisible(false);
    setAppState('HOME');
  };

  if (appState === 'SPLASH') {
    return <SplashScreen onPlay={() => setAppState('HOME')} />;
  }

  if (appState === 'HOME') {
    return (
      <HomeScreen 
        username={username}
        onPlayOnline={() => alert('Play Online - Coming Soon')}
        onPlayVsComputer={() => {
          setGameMode('VS_COMPUTER');
          setGameState(createGame(4, ['GREEN', 'YELLOW', 'BLUE']));
          setAppState('GAME');
        }}
        onPassNPlay={() => {
          setGameMode('PASS_N_PLAY');
          setGameState(createGame(4));
          setAppState('GAME');
        }}
        onPlayWithFriends={() => alert('Play with Friends - Coming Soon')}
        onSettings={() => setAppState('SETTINGS')}
      />
    );
  }

  if (appState === 'SETTINGS') {
    return (
      <SettingsScreen 
        username={username}
        session={session}
        onBack={() => setAppState('HOME')}
        onLogin={handleGoogleLogin}
        onLogout={() => supabase.auth.signOut()}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.title}>LUDO</Text>
        <TouchableOpacity style={styles.menuBtn} onPress={() => setIsMenuVisible(true)}>
          <Text style={styles.menuBtnText}>Menu</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.gameArea}>
        {/* Top Row Dice */}
        <View style={styles.diceRow}>
          <Dice 
            value={gameState.diceValue}
            isActive={gameState.activePlayer === 'RED'}
            onRoll={handleRollDice}
            disabled={gameState.turnPhase !== 'WAITING_FOR_ROLL' || gameState.gameOver || gameState.activePlayer !== 'RED' || gameState.players['RED']?.isBot}
          />
          <Dice 
            value={gameState.diceValue}
            isActive={gameState.activePlayer === 'GREEN'}
            onRoll={handleRollDice}
            disabled={gameState.turnPhase !== 'WAITING_FOR_ROLL' || gameState.gameOver || gameState.activePlayer !== 'GREEN' || gameState.players['GREEN']?.isBot}
          />
        </View>

        <View style={styles.boardContainer}>
          <LudoBoard />
          <Tokens 
            pieces={gameState.pieces} 
            eligiblePieces={
              gameState.players[gameState.activePlayer]?.isBot ? [] : eligiblePieces
            }
            onPiecePress={handlePiecePress} 
          />
        </View>

        {/* Bottom Row Dice */}
        <View style={styles.diceRow}>
          <Dice 
            value={gameState.diceValue}
            isActive={gameState.activePlayer === 'BLUE'}
            onRoll={handleRollDice}
            disabled={gameState.turnPhase !== 'WAITING_FOR_ROLL' || gameState.gameOver || gameState.activePlayer !== 'BLUE' || gameState.players['BLUE']?.isBot}
          />
          <Dice 
            value={gameState.diceValue}
            isActive={gameState.activePlayer === 'YELLOW'}
            onRoll={handleRollDice}
            disabled={gameState.turnPhase !== 'WAITING_FOR_ROLL' || gameState.gameOver || gameState.activePlayer !== 'YELLOW' || gameState.players['YELLOW']?.isBot}
          />
        </View>
      </View>

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
        onExitToHome={handleExitToHome}
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
  splashContainer: {
    flex: 1,
    backgroundColor: '#000000',
    position: 'relative',
  },
  playNowOverlay: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  playNowText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  gameArea: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  diceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  boardContainer: {
    width: width - 20,
    height: width - 20, // 1:1 aspect ratio with padding
    alignSelf: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  }
});
