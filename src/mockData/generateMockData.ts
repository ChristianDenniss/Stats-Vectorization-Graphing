// Mock data generator for testing
// Generates 3 seasons with 250 players each, each with unique random stats

import type { Player, Season, Stats, Game } from "../types/interfaces";

// Helper function to generate random number in range
const random = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

// Helper function to generate random integer in range
const randomInt = (min: number, max: number): number => {
  return Math.floor(random(min, max + 1));
};

// Generate a random player name
const generatePlayerName = (index: number): string => {
  const firstNames = [
    "Alex", "Sam", "Jordan", "Casey", "Taylor", "Morgan", "Riley", "Avery",
    "Quinn", "Blake", "Cameron", "Dakota", "Drew", "Emery", "Finley", "Harper",
    "Hayden", "Jamie", "Kai", "Logan", "Mason", "Noah", "Parker", "River",
    "Rowan", "Sage", "Skylar", "Tyler", "Willow", "Zion", "Aiden", "Blake",
    "Carter", "Dylan", "Ellis", "Finley", "Gray", "Harper", "Indigo", "Jules",
    "Kendall", "Lane", "Micah", "Nico", "Oakley", "Peyton", "Quinn", "Reese",
    "Sage", "Tatum", "Vale", "Wren", "Xander", "Yael", "Zane", "Adrian",
    "Blair", "Cameron", "Dana", "Eden", "Fallon", "Gale", "Haven", "Iris",
    "Jade", "Kai", "Lake", "Marlowe", "Nova", "Ocean", "Phoenix", "Quinn",
    "Rain", "Sky", "Terra", "Vale", "Willow", "Xara", "Yara", "Zara"
  ];
  
  const lastNames = [
    "Anderson", "Brown", "Davis", "Garcia", "Harris", "Jackson", "Johnson", "Jones",
    "Lee", "Martinez", "Miller", "Moore", "Robinson", "Smith", "Taylor", "Thomas",
    "Thompson", "White", "Williams", "Wilson", "Adams", "Baker", "Bell", "Brooks",
    "Campbell", "Carter", "Clark", "Collins", "Cook", "Cooper", "Cox", "Edwards",
    "Evans", "Flores", "Foster", "Gonzalez", "Green", "Hall", "Hill", "Howard",
    "Hughes", "James", "King", "Lewis", "Long", "Martin", "Mitchell", "Moore",
    "Morris", "Murphy", "Nelson", "Parker", "Perez", "Phillips", "Reed", "Richardson",
    "Rivera", "Roberts", "Rodriguez", "Rogers", "Ross", "Russell", "Sanchez", "Scott",
    "Stewart", "Turner", "Walker", "Ward", "Watson", "White", "Williams", "Wood",
    "Wright", "Young", "Allen", "Bailey", "Barnes", "Bennett", "Butler", "Campbell",
    "Carter", "Coleman", "Cox", "Diaz", "Fisher", "Foster", "Gomez", "Gray",
    "Griffin", "Hayes", "Henderson", "Hernandez", "Hughes", "Jenkins", "Kelly", "Kennedy"
  ];
  
  const firstName = firstNames[index % firstNames.length];
  const lastName = lastNames[Math.floor(index / firstNames.length) % lastNames.length];
  return `${firstName} ${lastName}`;
};

// Generate random stats for a player in a game
const generateGameStats = (gameId: string, playerId: string | number, seasonNumber: number): Stats => {
  // Create varied player profiles by using playerId as seed for consistency
  const seed = typeof playerId === 'string' ? parseInt(playerId) || 0 : playerId;
  const rng = (offset: number = 0) => {
    // Simple seeded random based on playerId + offset
    const x = Math.sin((seed + offset) * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };
  
  // Determine player archetype based on seed to create variety
  const archetypeSeed = seed % 10;
  
  let spikeKills, spikeAttempts, apeKills, apeAttempts;
  let blocks, assists, aces, digs, blockFollows;
  let spikingErrors, settingErrors, servingErrors, miscErrors;
  
  // Create different player profiles
  if (archetypeSeed === 0) {
    // High-volume attacker
    spikeAttempts = randomInt(25, 40);
    spikeKills = randomInt(Math.floor(spikeAttempts * 0.4), Math.floor(spikeAttempts * 0.6));
    apeAttempts = randomInt(8, 15);
    apeKills = randomInt(Math.floor(apeAttempts * 0.4), Math.floor(apeAttempts * 0.6));
    blocks = randomInt(1, 3);
    assists = randomInt(3, 7);
    aces = randomInt(0, 2);
    digs = randomInt(6, 12);
    blockFollows = randomInt(1, 3);
    spikingErrors = randomInt(3, 7);
    settingErrors = randomInt(0, 2);
    servingErrors = randomInt(1, 3);
    miscErrors = randomInt(0, 2);
  } else if (archetypeSeed === 1) {
    // Efficient attacker
    spikeAttempts = randomInt(15, 25);
    spikeKills = randomInt(Math.floor(spikeAttempts * 0.55), Math.floor(spikeAttempts * 0.7));
    apeAttempts = randomInt(4, 8);
    apeKills = randomInt(Math.floor(apeAttempts * 0.5), Math.floor(apeAttempts * 0.7));
    blocks = randomInt(3, 6);
    assists = randomInt(5, 10);
    aces = randomInt(1, 3);
    digs = randomInt(10, 15);
    blockFollows = randomInt(2, 4);
    spikingErrors = randomInt(0, 2);
    settingErrors = randomInt(0, 1);
    servingErrors = randomInt(0, 1);
    miscErrors = 0;
  } else if (archetypeSeed === 2) {
    // Defensive specialist
    spikeAttempts = randomInt(10, 18);
    spikeKills = randomInt(Math.floor(spikeAttempts * 0.4), Math.floor(spikeAttempts * 0.55));
    apeAttempts = randomInt(2, 6);
    apeKills = randomInt(Math.floor(apeAttempts * 0.3), Math.floor(apeAttempts * 0.5));
    blocks = randomInt(5, 8);
    assists = randomInt(2, 5);
    aces = randomInt(0, 2);
    digs = randomInt(15, 22);
    blockFollows = randomInt(3, 6);
    spikingErrors = randomInt(1, 3);
    settingErrors = randomInt(0, 2);
    servingErrors = randomInt(0, 2);
    miscErrors = randomInt(0, 1);
  } else if (archetypeSeed === 3) {
    // Setter/Playmaker
    spikeAttempts = randomInt(8, 15);
    spikeKills = randomInt(Math.floor(spikeAttempts * 0.35), Math.floor(spikeAttempts * 0.5));
    apeAttempts = randomInt(1, 5);
    apeKills = randomInt(Math.floor(apeAttempts * 0.3), Math.floor(apeAttempts * 0.5));
    blocks = randomInt(2, 4);
    assists = randomInt(12, 20);
    aces = randomInt(1, 4);
    digs = randomInt(8, 12);
    blockFollows = randomInt(1, 3);
    spikingErrors = randomInt(1, 3);
    settingErrors = randomInt(1, 3);
    servingErrors = randomInt(0, 2);
    miscErrors = randomInt(0, 1);
  } else if (archetypeSeed === 4) {
    // High error/risky player
    spikeAttempts = randomInt(20, 35);
    spikeKills = randomInt(Math.floor(spikeAttempts * 0.3), Math.floor(spikeAttempts * 0.5));
    apeAttempts = randomInt(6, 12);
    apeKills = randomInt(Math.floor(apeAttempts * 0.3), Math.floor(apeAttempts * 0.5));
    blocks = randomInt(1, 3);
    assists = randomInt(1, 4);
    aces = randomInt(0, 2);
    digs = randomInt(4, 8);
    blockFollows = randomInt(0, 2);
    spikingErrors = randomInt(6, 10);
    settingErrors = randomInt(1, 3);
    servingErrors = randomInt(2, 5);
    miscErrors = randomInt(1, 3);
  } else if (archetypeSeed === 5) {
    // Balanced all-around
    spikeAttempts = randomInt(18, 28);
    spikeKills = randomInt(Math.floor(spikeAttempts * 0.45), Math.floor(spikeAttempts * 0.6));
    apeAttempts = randomInt(5, 10);
    apeKills = randomInt(Math.floor(apeAttempts * 0.4), Math.floor(apeAttempts * 0.6));
    blocks = randomInt(3, 5);
    assists = randomInt(5, 9);
    aces = randomInt(1, 3);
    digs = randomInt(10, 16);
    blockFollows = randomInt(2, 4);
    spikingErrors = randomInt(2, 4);
    settingErrors = randomInt(0, 2);
    servingErrors = randomInt(0, 2);
    miscErrors = randomInt(0, 1);
  } else if (archetypeSeed === 6) {
    // High ace server
    spikeAttempts = randomInt(12, 22);
    spikeKills = randomInt(Math.floor(spikeAttempts * 0.4), Math.floor(spikeAttempts * 0.55));
    apeAttempts = randomInt(3, 8);
    apeKills = randomInt(Math.floor(apeAttempts * 0.35), Math.floor(apeAttempts * 0.55));
    blocks = randomInt(2, 4);
    assists = randomInt(3, 6);
    aces = randomInt(4, 8);
    digs = randomInt(6, 11);
    blockFollows = randomInt(1, 3);
    spikingErrors = randomInt(1, 3);
    settingErrors = randomInt(0, 1);
    servingErrors = randomInt(2, 5);
    miscErrors = randomInt(0, 1);
  } else if (archetypeSeed === 7) {
    // Low volume specialist
    spikeAttempts = randomInt(8, 15);
    spikeKills = randomInt(Math.floor(spikeAttempts * 0.4), Math.floor(spikeAttempts * 0.6));
    apeAttempts = randomInt(1, 4);
    apeKills = randomInt(Math.floor(apeAttempts * 0.3), Math.floor(apeAttempts * 0.6));
    blocks = randomInt(1, 3);
    assists = randomInt(1, 4);
    aces = randomInt(0, 2);
    digs = randomInt(3, 8);
    blockFollows = randomInt(0, 2);
    spikingErrors = randomInt(1, 3);
    settingErrors = randomInt(0, 2);
    servingErrors = randomInt(0, 2);
    miscErrors = randomInt(0, 1);
  } else if (archetypeSeed === 8) {
    // Versatile utility
    spikeAttempts = randomInt(15, 25);
    spikeKills = randomInt(Math.floor(spikeAttempts * 0.45), Math.floor(spikeAttempts * 0.6));
    apeAttempts = randomInt(4, 9);
    apeKills = randomInt(Math.floor(apeAttempts * 0.4), Math.floor(apeAttempts * 0.6));
    blocks = randomInt(2, 5);
    assists = randomInt(4, 8);
    aces = randomInt(1, 3);
    digs = randomInt(8, 14);
    blockFollows = randomInt(2, 4);
    spikingErrors = randomInt(2, 4);
    settingErrors = randomInt(0, 2);
    servingErrors = randomInt(0, 2);
    miscErrors = randomInt(0, 1);
  } else {
    // Balanced with slight variation
    spikeAttempts = randomInt(16, 26);
    spikeKills = randomInt(Math.floor(spikeAttempts * 0.4), Math.floor(spikeAttempts * 0.6));
    apeAttempts = randomInt(4, 9);
    apeKills = randomInt(Math.floor(apeAttempts * 0.35), Math.floor(apeAttempts * 0.6));
    blocks = randomInt(2, 5);
    assists = randomInt(4, 9);
    aces = randomInt(0, 3);
    digs = randomInt(8, 15);
    blockFollows = randomInt(1, 4);
    spikingErrors = randomInt(2, 5);
    settingErrors = randomInt(0, 2);
    servingErrors = randomInt(0, 3);
    miscErrors = randomInt(0, 2);
  }
  
  // Add some randomness to make each game unique
  const gameVariation = rng(parseInt(gameId) || 0);
  spikeKills = Math.max(0, Math.floor(spikeKills * (0.8 + gameVariation * 0.4)));
  spikeAttempts = Math.max(spikeKills, Math.floor(spikeAttempts * (0.8 + gameVariation * 0.4)));
  apeKills = Math.max(0, Math.floor(apeKills * (0.8 + gameVariation * 0.4)));
  apeAttempts = Math.max(apeKills, Math.floor(apeAttempts * (0.8 + gameVariation * 0.4)));
  
  return {
    id: `stat-${gameId}-${playerId}`,
    playerId: String(playerId),
    gameId: gameId,
    spikeKills,
    spikeAttempts,
    apeKills,
    apeAttempts,
    blocks,
    assists,
    aces,
    digs,
    blockFollows,
    spikingErrors,
    settingErrors,
    servingErrors,
    miscErrors,
    game: {
      id: gameId,
      team1Score: randomInt(0, 3),
      team2Score: randomInt(0, 3),
      season: {
        id: String(seasonNumber),
        seasonNumber,
        theme: seasonNumber === 1 ? "Spring 2024" : seasonNumber === 2 ? "Fall 2024" : "Winter 2025"
      }
    }
  };
};

// Generate all mock data
export const generateMockData = (): { players: Player[]; seasons: Season[] } => {
  const seasons: Season[] = [
    { id: "1", seasonNumber: 1, theme: "Spring 2024", startDate: "2024-03-01", endDate: "2024-05-31" },
    { id: "2", seasonNumber: 2, theme: "Fall 2024", startDate: "2024-09-01", endDate: "2024-11-30" },
    { id: "3", seasonNumber: 3, theme: "Winter 2025", startDate: "2025-01-01", endDate: "2025-03-31" }
  ];
  
  const players: Player[] = [];
  let playerIdCounter = 1;
  
  // Generate 250 players for each season
  for (let seasonNum = 1; seasonNum <= 3; seasonNum++) {
    for (let playerIndex = 0; playerIndex < 250; playerIndex++) {
      const playerId = playerIdCounter++;
      const playerName = generatePlayerName(playerId - 1);
      
      // Each player plays 3-8 games in their season
      const numGames = randomInt(3, 8);
      const stats: Stats[] = [];
      
      for (let gameIndex = 0; gameIndex < numGames; gameIndex++) {
        const gameId = `game-${seasonNum}-${playerId}-${gameIndex}`;
        const gameStats = generateGameStats(gameId, playerId, seasonNum);
        stats.push(gameStats);
      }
      
      players.push({
        id: String(playerId),
        name: playerName,
        stats,
        teamId: `team-${seasonNum}-${Math.floor(playerIndex / 10)}`,
        teamName: `Team ${Math.floor(playerIndex / 10) + 1}`
      });
    }
  }
  
  return { players, seasons };
};

// Generate and export the mock data
export const mockSeasons: Season[] = [
  { id: "1", seasonNumber: 1, theme: "Spring 2024", startDate: "2024-03-01", endDate: "2024-05-31" },
  { id: "2", seasonNumber: 2, theme: "Fall 2024", startDate: "2024-09-01", endDate: "2024-11-30" },
  { id: "3", seasonNumber: 3, theme: "Winter 2025", startDate: "2025-01-01", endDate: "2025-03-31" }
];

export const mockPlayers: Player[] = (() => {
  const { players } = generateMockData();
  return players;
})();

