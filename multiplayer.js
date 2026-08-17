import { supabase } from './supabase';

class MultiplayerManager {
  constructor() {
    this.roomCode = null;
    this.channel = null;
    this.onStateReceived = null;
    this.onPlayerJoined = null;
    this.userId = null;
  }

  async init(userId) {
    this.userId = userId;
  }

  async createRoom(gameState) {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    if (!this.userId) {
      console.warn('Cannot create room without being logged in (or having a userId)');
      return null;
    }

    const { data, error } = await supabase
      .from('rooms')
      .insert([
        { code, host_id: this.userId, state: gameState }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating room:', error);
      return null;
    }

    this.roomCode = code;
    this.subscribeToRoom(code);
    return code;
  }

  async joinRoom(code) {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('code', code)
      .single();

    if (error || !data) {
      console.error('Error joining room or room not found:', error);
      return null;
    }

    this.roomCode = code;
    this.subscribeToRoom(code);
    return data.state;
  }

  subscribeToRoom(code) {
    if (this.channel) {
      supabase.removeChannel(this.channel);
    }

    this.channel = supabase.channel(`room:${code}`, {
      config: {
        presence: {
          key: this.userId,
        },
      },
    });

    this.channel
      .on('presence', { event: 'sync' }, () => {
        const state = this.channel.presenceState();
        if (this.onPlayerJoined) {
          this.onPlayerJoined(state);
        }
      })
      .on('broadcast', { event: 'game_state_update' }, (payload) => {
        if (this.onStateReceived) {
          this.onStateReceived(payload.payload.state);
        }
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await this.channel.track({ user_id: this.userId, joined_at: new Date() });
        }
      });
  }

  broadcastGameState(state) {
    if (this.channel) {
      this.channel.send({
        type: 'broadcast',
        event: 'game_state_update',
        payload: { state },
      });
    }
  }

  leaveRoom() {
    if (this.channel) {
      supabase.removeChannel(this.channel);
      this.channel = null;
    }
    this.roomCode = null;
  }
}

export const multiplayer = new MultiplayerManager();
