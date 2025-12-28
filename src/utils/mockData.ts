// Mock data for testing - structured to match the expected API format
// This data provides varied player profiles for testing the vectorization system

import type { Player, Season } from "../types/interfaces";

export const mockSeasons: Season[] = [
  { id: "1", seasonNumber: 1, theme: "Spring 2024" },
  { id: "2", seasonNumber: 2, theme: "Fall 2024" },
];

// Helper to create a game with season
const createGame = (gameId: string, team1Score: number, team2Score: number, seasonNumber: number) => ({
  id: gameId,
  team1Score,
  team2Score,
  season: {
    id: String(seasonNumber),
    seasonNumber,
    theme: seasonNumber === 1 ? "Spring 2024" : "Fall 2024"
  }
});

export const mockPlayers: Player[] = [
  // Player 1: High-volume attacker (lots of kills, high attempts)
  {
    id: "1",
    name: "Alex Power",
    stats: [
      {
        id: "stat1",
        playerId: "1",
        gameId: "game1",
        spikeKills: 18,
        spikeAttempts: 35,
        apeKills: 6,
        apeAttempts: 12,
        blocks: 2,
        assists: 5,
        aces: 1,
        digs: 8,
        blockFollows: 1,
        spikingErrors: 4,
        settingErrors: 0,
        servingErrors: 1,
        miscErrors: 0,
        game: createGame("game1", 3, 1, 1)
      },
      {
        id: "stat2",
        playerId: "1",
        gameId: "game2",
        spikeKills: 16,
        spikeAttempts: 32,
        apeKills: 5,
        apeAttempts: 10,
        blocks: 3,
        assists: 4,
        aces: 2,
        digs: 9,
        blockFollows: 2,
        spikingErrors: 3,
        settingErrors: 1,
        servingErrors: 2,
        miscErrors: 1,
        game: createGame("game2", 2, 3, 1)
      },
      {
        id: "stat3",
        playerId: "1",
        gameId: "game3",
        spikeKills: 20,
        spikeAttempts: 38,
        apeKills: 7,
        apeAttempts: 14,
        blocks: 1,
        assists: 6,
        aces: 1,
        digs: 7,
        blockFollows: 1,
        spikingErrors: 5,
        settingErrors: 0,
        servingErrors: 1,
        miscErrors: 0,
        game: createGame("game3", 3, 0, 1)
      }
    ]
  },
  // Player 2: Efficient attacker (high percentage, moderate volume)
  {
    id: "2",
    name: "Sam Precision",
    stats: [
      {
        id: "stat4",
        playerId: "2",
        gameId: "game1",
        spikeKills: 12,
        spikeAttempts: 18,
        apeKills: 4,
        apeAttempts: 6,
        blocks: 4,
        assists: 8,
        aces: 2,
        digs: 11,
        blockFollows: 2,
        spikingErrors: 1,
        settingErrors: 0,
        servingErrors: 0,
        miscErrors: 0,
        game: createGame("game1", 3, 1, 1)
      },
      {
        id: "stat5",
        playerId: "2",
        gameId: "game2",
        spikeKills: 14,
        spikeAttempts: 20,
        apeKills: 5,
        apeAttempts: 7,
        blocks: 3,
        assists: 9,
        aces: 3,
        digs: 13,
        blockFollows: 3,
        spikingErrors: 2,
        settingErrors: 1,
        servingErrors: 1,
        miscErrors: 0,
        game: createGame("game2", 2, 3, 1)
      },
      {
        id: "stat6",
        playerId: "2",
        gameId: "game4",
        spikeKills: 11,
        spikeAttempts: 17,
        apeKills: 3,
        apeAttempts: 5,
        blocks: 5,
        assists: 7,
        aces: 2,
        digs: 12,
        blockFollows: 2,
        spikingErrors: 1,
        settingErrors: 0,
        servingErrors: 0,
        miscErrors: 0,
        game: createGame("game4", 3, 2, 1)
      }
    ]
  },
  // Player 3: Defensive specialist (high digs, blocks, low errors)
  {
    id: "3",
    name: "Jordan Defender",
    stats: [
      {
        id: "stat7",
        playerId: "3",
        gameId: "game1",
        spikeKills: 8,
        spikeAttempts: 15,
        apeKills: 2,
        apeAttempts: 5,
        blocks: 6,
        assists: 3,
        aces: 1,
        digs: 18,
        blockFollows: 4,
        spikingErrors: 2,
        settingErrors: 1,
        servingErrors: 1,
        miscErrors: 0,
        game: createGame("game1", 3, 1, 1)
      },
      {
        id: "stat8",
        playerId: "3",
        gameId: "game3",
        spikeKills: 7,
        spikeAttempts: 14,
        apeKills: 2,
        apeAttempts: 4,
        blocks: 7,
        assists: 2,
        aces: 0,
        digs: 20,
        blockFollows: 5,
        spikingErrors: 1,
        settingErrors: 0,
        servingErrors: 0,
        miscErrors: 0,
        game: createGame("game3", 3, 0, 1)
      },
      {
        id: "stat9",
        playerId: "3",
        gameId: "game4",
        spikeKills: 9,
        spikeAttempts: 16,
        apeKills: 3,
        apeAttempts: 6,
        blocks: 5,
        assists: 4,
        aces: 1,
        digs: 16,
        blockFollows: 3,
        spikingErrors: 2,
        settingErrors: 1,
        servingErrors: 1,
        miscErrors: 0,
        game: createGame("game4", 3, 2, 1)
      }
    ]
  },
  // Player 4: Setter/All-around (high assists, balanced stats)
  {
    id: "4",
    name: "Casey Setter",
    stats: [
      {
        id: "stat10",
        playerId: "4",
        gameId: "game2",
        spikeKills: 6,
        spikeAttempts: 12,
        apeKills: 2,
        apeAttempts: 4,
        blocks: 2,
        assists: 15,
        aces: 2,
        digs: 10,
        blockFollows: 2,
        spikingErrors: 1,
        settingErrors: 2,
        servingErrors: 1,
        miscErrors: 0,
        game: createGame("game2", 2, 3, 1)
      },
      {
        id: "stat11",
        playerId: "4",
        gameId: "game3",
        spikeKills: 5,
        spikeAttempts: 11,
        apeKills: 1,
        apeAttempts: 3,
        blocks: 3,
        assists: 18,
        aces: 3,
        digs: 9,
        blockFollows: 1,
        spikingErrors: 1,
        settingErrors: 1,
        servingErrors: 0,
        miscErrors: 0,
        game: createGame("game3", 3, 0, 1)
      },
      {
        id: "stat12",
        playerId: "4",
        gameId: "game4",
        spikeKills: 7,
        spikeAttempts: 13,
        apeKills: 2,
        apeAttempts: 5,
        blocks: 2,
        assists: 16,
        aces: 2,
        digs: 11,
        blockFollows: 2,
        spikingErrors: 2,
        settingErrors: 2,
        servingErrors: 1,
        miscErrors: 1,
        game: createGame("game4", 3, 2, 1)
      }
    ]
  },
  // Player 5: High error player (lots of attempts, many errors)
  {
    id: "5",
    name: "Taylor Risky",
    stats: [
      {
        id: "stat13",
        playerId: "5",
        gameId: "game2",
        spikeKills: 10,
        spikeAttempts: 28,
        apeKills: 3,
        apeAttempts: 10,
        blocks: 1,
        assists: 2,
        aces: 0,
        digs: 5,
        blockFollows: 1,
        spikingErrors: 8,
        settingErrors: 2,
        servingErrors: 3,
        miscErrors: 2,
        game: createGame("game2", 2, 3, 1)
      },
      {
        id: "stat14",
        playerId: "5",
        gameId: "game4",
        spikeKills: 9,
        spikeAttempts: 26,
        apeKills: 2,
        apeAttempts: 9,
        blocks: 2,
        assists: 3,
        aces: 1,
        digs: 6,
        blockFollows: 1,
        spikingErrors: 7,
        settingErrors: 1,
        servingErrors: 2,
        miscErrors: 1,
        game: createGame("game4", 3, 2, 1)
      }
    ]
  },
  // Player 6: Balanced all-around player
  {
    id: "6",
    name: "Morgan Balanced",
    stats: [
      {
        id: "stat15",
        playerId: "6",
        gameId: "game1",
        spikeKills: 11,
        spikeAttempts: 22,
        apeKills: 4,
        apeAttempts: 8,
        blocks: 4,
        assists: 7,
        aces: 2,
        digs: 13,
        blockFollows: 3,
        spikingErrors: 3,
        settingErrors: 1,
        servingErrors: 1,
        miscErrors: 0,
        game: createGame("game1", 3, 1, 1)
      },
      {
        id: "stat16",
        playerId: "6",
        gameId: "game3",
        spikeKills: 12,
        spikeAttempts: 24,
        apeKills: 5,
        apeAttempts: 9,
        blocks: 3,
        assists: 8,
        aces: 1,
        digs: 14,
        blockFollows: 2,
        spikingErrors: 2,
        settingErrors: 0,
        servingErrors: 1,
        miscErrors: 0,
        game: createGame("game3", 3, 0, 1)
      },
      {
        id: "stat17",
        playerId: "6",
        gameId: "game4",
        spikeKills: 10,
        spikeAttempts: 21,
        apeKills: 4,
        apeAttempts: 7,
        blocks: 4,
        assists: 6,
        aces: 2,
        digs: 12,
        blockFollows: 3,
        spikingErrors: 3,
        settingErrors: 1,
        servingErrors: 1,
        miscErrors: 0,
        game: createGame("game4", 3, 2, 1)
      }
    ]
  },
  // Player 7: Low volume player (few sets, testing threshold)
  {
    id: "7",
    name: "Riley Limited",
    stats: [
      {
        id: "stat18",
        playerId: "7",
        gameId: "game1",
        spikeKills: 5,
        spikeAttempts: 10,
        apeKills: 1,
        apeAttempts: 3,
        blocks: 1,
        assists: 2,
        aces: 0,
        digs: 4,
        blockFollows: 1,
        spikingErrors: 2,
        settingErrors: 1,
        servingErrors: 1,
        miscErrors: 0,
        game: createGame("game1", 3, 1, 1)
      }
    ]
  },
  // Player 8: High ace server
  {
    id: "8",
    name: "Avery Server",
    stats: [
      {
        id: "stat19",
        playerId: "8",
        gameId: "game1",
        spikeKills: 9,
        spikeAttempts: 18,
        apeKills: 3,
        apeAttempts: 6,
        blocks: 2,
        assists: 4,
        aces: 5,
        digs: 8,
        blockFollows: 1,
        spikingErrors: 2,
        settingErrors: 0,
        servingErrors: 3,
        miscErrors: 0,
        game: createGame("game1", 3, 1, 1)
      },
      {
        id: "stat20",
        playerId: "8",
        gameId: "game2",
        spikeKills: 8,
        spikeAttempts: 17,
        apeKills: 2,
        apeAttempts: 5,
        blocks: 3,
        assists: 5,
        aces: 4,
        digs: 9,
        blockFollows: 2,
        spikingErrors: 1,
        settingErrors: 1,
        servingErrors: 2,
        miscErrors: 0,
        game: createGame("game2", 2, 3, 1)
      },
      {
        id: "stat21",
        playerId: "8",
        gameId: "game3",
        spikeKills: 10,
        spikeAttempts: 19,
        apeKills: 4,
        apeAttempts: 7,
        blocks: 2,
        assists: 3,
        aces: 6,
        digs: 7,
        blockFollows: 1,
        spikingErrors: 2,
        settingErrors: 0,
        servingErrors: 4,
        miscErrors: 0,
        game: createGame("game3", 3, 0, 1)
      }
    ]
  }
];

