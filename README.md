# Stats Vectorization & Graphing

A React-based system for vectorizing player statistics and visualizing them in 3D space.

## Overview

This system transforms player statistics from a relational data model into numeric vectors, normalizes them, and projects them into 3D space for visualization. It's designed to be extensible and modular, serving as a foundation for analytical features like player similarity, clustering, and development trajectories.

## Features

- **Season-scoped embeddings**: Players are compared within the same season context
- **Per-set normalization**: Stats are normalized by sets played to account for opportunity
- **Configurable thresholds**: User-controlled minimum sets played filter
- **3D visualization**: Interactive 3D graph using React Three Fiber
- **Z-score normalization**: Features are standardized within each season

## Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Current Setup

**The application currently uses mock data by default.** The hooks are structured to look like they're connecting to an API, but they're using mock data internally. This allows you to:

- Test the system immediately without setting up a backend
- See how the vectorization and visualization work
- Easily swap to a real API later (see "Connecting to a Real API" below)

The mock data includes 8 players with varied statistical profiles:
- High-volume attackers
- Efficient attackers
- Defensive specialists
- Setters/all-around players
- High-error players
- Balanced players
- Low-volume players (for testing thresholds)
- High ace servers

## Connecting to a Real API

When you're ready to connect to a real backend API:

1. **Configure your API endpoint:**
   - Create a `.env` file in the root directory
   - Add: `REACT_APP_API_BASE_URL=http://localhost:3001/api`
   - Adjust the URL to match your backend API

2. **Update the hooks:**
   - Open `src/hooks/useVectorGraphData.ts`
   - In `useFetchPlayersWithStats()`, replace the mock data section with the commented fetch code
   - In `useFetchSeasons()`, replace the mock data section with the commented fetch code
   - Remove the mock data imports

3. **API Endpoints Expected:**

   - **GET `/api/players?includeStats=true`**
     - Returns an array of Player objects with nested stats
     - Each Player should have: `id`, `name`, and `stats[]`
     - Each Stat should have: `game` (with `season`), and all stat fields

   - **GET `/api/seasons`**
     - Returns an array of Season objects
     - Each Season should have: `id`, `seasonNumber`, and optionally `theme`

### Example API Response Structure

```json
{
  "players": [
    {
      "id": "1",
      "name": "Player Name",
      "stats": [
        {
          "id": "stat1",
          "spikeKills": 10,
          "spikeAttempts": 20,
          "game": {
            "id": "game1",
            "team1Score": 2,
            "team2Score": 1,
            "season": {
              "id": "season1",
              "seasonNumber": 1
            }
          }
        }
      ]
    }
  ],
  "seasons": [
    {
      "id": "season1",
      "seasonNumber": 1,
      "theme": "Spring 2024"
    }
  ]
}
```

## Development

### Project Structure

```
src/
  analytics/
    statsVectorization.ts    # Core vectorization logic
  components/
    VectorGraphPage.tsx      # Main React component
  hooks/
    useVectorGraphData.ts    # Data fetching hooks (uses mock data)
  styles/
    VectorGraphPage.css      # Component styles
  types/
    interfaces.ts            # TypeScript type definitions
  utils/
    mockData.ts              # Mock data for testing
  App.tsx                    # Root component
  index.tsx                  # Entry point
```

### Key Files

- **`statsVectorization.ts`**: Contains the core logic for:
  - Aggregating player season stats
  - Computing per-set features
  - Z-score normalization
  - 3D projection (currently simple, PCA planned for v2)

- **`VectorGraphPage.tsx`**: Main UI component with:
  - Season selector
  - Minimum sets threshold slider
  - 3D graph visualization
  - Player hover/selection

- **`useVectorGraphData.ts`**: Data fetching hooks that currently use mock data but are structured for easy API integration

## Vector Features

The system vectorizes the following per-set features:

1. `killsPerSet` - Total kills (spike + ape) per set
2. `attemptsPerSet` - Total attempts per set
3. `totalSpikePct` - Combined spike percentage
4. `spikePct` - Spike-only percentage
5. `apePct` - Ape-only percentage
6. `blocksPerSet` - Blocks per set
7. `assistsPerSet` - Assists per set
8. `acesPerSet` - Aces per set
9. `digsPerSet` - Digs per set
10. `receivesPerSet` - Receives (digs + block follows) per set
11. `errorsPerSet` - Total errors per set
12. `plusMinusPerSet` - Plus/minus (PRF - errors) per set

## Future Enhancements

- PCA-based 3D projection (v2)
- Player similarity calculations
- Clustering and archetype detection
- Cross-season comparisons
- Career trajectory visualization

## License

See LICENSE file for details.

