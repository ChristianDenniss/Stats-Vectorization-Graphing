// Type definitions for the stats vectorization system

export interface Season {
  id: string;
  seasonNumber: number;
  theme?: string;
  startDate?: string;
  endDate?: string;
}

export interface Game {
  id: string;
  season?: Season;
  team1Score: number;
  team2Score: number;
  date?: string;
  team1Name?: string;
  team2Name?: string;
}

export interface Stats {
  id?: string;
  playerId?: string;
  gameId?: string;
  game?: Game;
  
  // Spike stats
  spikeKills?: number;
  spikeAttempts?: number;
  
  // Ape stats
  apeKills?: number;
  apeAttempts?: number;
  
  // Other stats
  blocks?: number;
  assists?: number;
  aces?: number;
  digs?: number;
  blockFollows?: number;
  
  // Errors
  spikingErrors?: number;
  settingErrors?: number;
  servingErrors?: number;
  miscErrors?: number;
}

export interface Player {
  id: string | number;
  name: string;
  stats?: Stats[];
  teamId?: string;
  teamName?: string;
}

