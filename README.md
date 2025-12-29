# 3D Vector Graph - Player Statistical Analysis

## Overview

The 3D Vector Graph is an interactive analytical tool that visualizes player statistical profiles in three-dimensional space. It transforms raw volleyball statistics into normalized vectors, projects them using Principal Component Analysis (PCA), and classifies players into descriptive archetypes based on their play styles.

This system provides a foundation for:
- **Player similarity analysis** - Find players with similar statistical profiles
- **Archetype classification** - Categorize players by play style and role
- **Statistical exploration** - Visualize relationships between different statistical dimensions
- **Season-based comparison** - Analyze players within the context of a specific season

## Features

### 🎯 Core Functionality

- **3D Visualization**: Interactive 3D scatter plot of player vectors using React Three Fiber
- **PCA Projection**: Projects 13-dimensional statistical vectors into 3D space using Principal Component Analysis
- **Player Archetypes**: Rule-based classification system with creative naming (e.g., "Maverick Striker", "Intimidating Playmaker", "Unicorn")
- **Player Similarity**: Calculates and displays most similar and least similar players
- **Season Filtering**: Analyze players within specific seasons with configurable minimum sets threshold
- **Interactive Controls**: Click to select, hover to preview, rotate/pan/zoom the 3D graph

### 🎨 Visual Features

- **Color-Coded Archetypes**: Each archetype has a unique color for easy identification
- **Dynamic Point Scaling**: Selected and hovered points scale up for visibility
- **Player Labels**: Show player names and sets played on hover/selection
- **Info Panel**: Collapsible sections for player info, controls, and PCA axis explanations
- **PCA Component Breakdown**: Color-coded display of which statistics contribute most to each principal component

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

**The application currently uses mock data by default.** The app loads mock data directly without using API hooks, allowing you to:

- Test the system immediately without setting up a backend
- See how the vectorization and visualization work
- Easily swap to a real API later (see "Connecting to a Real API" below)

The mock data includes:
- **3 seasons** (Spring 2024, Fall 2024, Winter 2025)
- **250 players per season** (750 total players)
- **Unique random stats** for each player with varied archetypes:
  - High-volume attackers
  - Efficient attackers
  - Defensive specialists
  - Setters/playmakers
  - High-error/risky players
  - Balanced all-around players
  - Low-volume specialists
  - High ace servers
  - Versatile utility players

## How It Works

### Statistical Vectorization

1. **Data Aggregation**: For each player in a season, aggregate all game statistics
2. **Per-Set Normalization**: Convert raw totals to per-set rates (e.g., `spikeKillsPerSet`, `assistsPerSet`)
3. **Z-Score Normalization**: Normalize per-set features within the season population using z-scores
4. **Fixed-Schema Vectors**: Create 13-dimensional vectors with a fixed feature order

**13 Statistical Dimensions:**
- `spikeKillsPerSet`, `spikeAttemptsPerSet`
- `apeKillsPerSet`, `apeAttemptsPerSet`
- `blocksPerSet`, `assistsPerSet`, `acesPerSet`, `digsPerSet`, `blockFollowsPerSet`
- `spikingErrorsPerSet`, `settingErrorsPerSet`, `servingErrorsPerSet`, `miscErrorsPerSet`

### PCA Projection

- **Principal Component Analysis**: Reduces 13 dimensions to 3 for visualization
- **Season-Scoped**: PCA is computed per-season to ensure contextual comparisons
- **Emergent Axes**: Axis meanings are derived from contributing features, not pre-assigned
- **Variance Explained**: Displays how much variance each component captures

### Player Archetype System

The archetype system uses a **prefix-suffix combination model** with standalone exceptions:

**Primary Traits (Prefixes)** - Describe error/consistency patterns:
- **Maverick**: Takes risks and makes more errors in pursuit of aggressive plays
- **Precise**: Minimizes errors and maintains high consistency
- **Workhorse**: High volume player who handles a large share of team actions
- **Selective**: Low volume player who picks their moments carefully
- **Steady**: Conservative approach with low attempts and minimal errors

**Secondary Traits (Suffixes)** - Describe role/play style:
- **Striker**: Primary offensive threat with high kill and attempt rates
- **Guardian**: Defensive specialist excelling in digs and blocks
- **Playmaker**: Elite setter who orchestrates the offense (6+ assists/set)
- **Finisher**: Efficient scorer who converts attacks into kills at a high rate
- **Intimidator**: Dominant blocker who controls the net (1+ blocks/set)
- **Bomber**: Powerful server who generates aces (0.8+ aces/set)
- **Versatile**: Well-rounded player contributing in multiple areas
- **Jack of All Trades**: Utility player with moderate contributions across categories

**Standalone Archetypes** - Unique player types:
- **Perfectly Balanced**: Exceptionally balanced across offense, defense, and setting
- **Unicorn**: Elite performance in 3+ different categories simultaneously
- **Sniper**: Exceptional kill rate (55%+) with minimal errors
- **Gunslinger**: High volume, high risk, high reward attacker
- **Anchor**: Steady, reliable player with low attempts and minimal errors

**Special Combinations**:
- **Intimidating Playmaker**: Block-heavy player who also orchestrates offense
- **Playmaking Intimidator**: Assist-heavy setter with commanding net presence
- **Maverick Playmaker**: Risk-taking setter who creates opportunities

## Usage

### Controls

**3D Graph Navigation:**
- **Rotate**: Left Click + Drag
- **Pan**: Right Click + Drag
- **Zoom**: Mouse Scroll Wheel
- **Zoom In/Out**: `+` / `-` Keys

**Player Interaction:**
- **View Player Info**: Hover over a point
- **Select Player**: Click on a point (persists until deselected)
- **Deselect**: Click on empty space or another player
- **View Similarity**: Selected players show most/least similar players

**Info Panel:**
- **Toggle Visibility**: Click the `ℹ` button (top right)
- **Collapse Sections**: Click section headers to collapse/expand
- **Player Info**: Shows selected/hovered player details, archetype, and similarity
- **Controls**: Lists all available keyboard and mouse controls
- **Axes (PCA)**: Explains what each principal component represents

### Configuration

- **Season Selection**: Choose a season from the dropdown
- **Minimum Sets**: Adjust the minimum sets played threshold (default: 5)
  - Filters out players with insufficient sample size
  - Lower threshold = more players, potentially more noise
  - Higher threshold = fewer players, more stable statistics

## Connecting to a Real API

When you're ready to connect to a real backend API:

1. **Configure your API endpoint:**
   - Create a `.env` file in the root directory
   - Add: `REACT_APP_API_BASE_URL=http://localhost:3001/api`
   - Adjust the URL to match your backend API

2. **Update VectorGraphPage.tsx:**
   - Comment out the mock data imports and direct usage
   - Uncomment the hook imports: `useFetchPlayersWithStats` and `useFetchSeasons`
   - Replace the mock data variables with hook calls

3. **Update the hooks:**
   - Open `src/hooks/useVectorGraphData.ts`
   - In `useFetchPlayersWithStats()`, uncomment the fetch call and remove the mock data section
   - In `useFetchSeasons()`, uncomment the fetch call and remove the mock data section

4. **API Endpoints Expected:**

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

## Technical Architecture

### File Structure

```
src/
├── components/
│   └── VectorGraphPage.tsx          # Main component orchestrating the graph
├── analytics/
│   ├── statsVectorization.ts       # Vectorization and PCA logic
│   └── playerArchetypes.ts          # Archetype classification system
├── hooks/
│   └── useVectorGraphData.ts        # Data fetching hooks (API calls commented out)
├── mockData/
│   └── generateMockData.ts          # Mock data generator (3 seasons, 250 players each)
├── styles/
│   └── VectorGraphPage.css          # Styling for the graph page
└── types/
    └── interfaces.ts                 # TypeScript type definitions
```

### Key Components

**VectorGraphPage.tsx**
- Main page component that loads mock data and renders the graph
- Manages season selection and minimum sets threshold
- Handles player selection and similarity calculations

**VectorGraph3D** (inline component)
- Renders the 3D canvas using React Three Fiber
- Manages player point interactions (hover, click, selection)
- Displays info panel with player details, controls, and PCA information

**PlayerPoint** (inline component)
- Individual 3D point representing a player
- Handles hover and click events
- Displays player labels and scales based on interaction state

**statsVectorization.ts**
- `buildSeasonVectors()`: Aggregates player stats and creates normalized vectors
- `computePCA3D()`: Performs PCA and projects vectors to 3D
- `getTopFeatures()`: Identifies which statistics contribute most to each component

**playerArchetypes.ts**
- `classifyPlayerArchetype()`: Classifies players into archetypes based on statistical profiles
- Defines all primary traits, secondary traits, and standalone archetypes
- Handles special combination cases

**generateMockData.ts**
- Generates 3 seasons with 250 players each
- Creates varied player archetypes with unique random stats
- Each player has 3-8 games with randomized statistics

## Design Principles

### Season-Scoped Analysis
- All comparisons are within a single season to preserve contextual meaning
- PCA axes are consistent within a season but may differ across seasons
- Statistical environments differ across seasons, so season-scoped embeddings ensure fair comparisons

### Per-Set Normalization
- Raw totals disproportionately reward playing time/opportunity
- Per-set rates better represent how a player performs when involved
- Provides a more objective normalization method than raw totals

### Neutral Vectors
- Vectors describe **statistical profiles**, not value or quality
- No subjective weighting of statistics
- Separates "what a player does" from "how valuable it is"
- Keeps the base system clean and reusable for future value-weighted models

### Explainable Transformations
- Uses transparent methods (rates, normalization, linear projections)
- Avoids black-box approaches
- PCA components are explained by showing contributing features
- Archetype classifications are rule-based and interpretable

## Future Directions

The system is designed to be extensible and supports future enhancements:

- **Value-Weighted Models**: Layer subjective importance weights on top of neutral vectors
- **Career-Level Embeddings**: Track player development across multiple seasons
- **Cross-Season Comparison**: Global projections that allow season-to-season comparison
- **Alternative Projections**: Support for UMAP, t-SNE, or other dimensionality reduction methods
- **Advanced Clustering**: Machine learning-based clustering in addition to rule-based archetypes
- **Trajectory Analysis**: Visualize how player statistics change over time

## Version History

- **v2.9**: Creative archetype naming system with comprehensive descriptions
- **v2.8**: Prefix-suffix archetype combination model, separated into own module
- **v2.7**: Player archetype system (replaced K-means clustering)
- **v2.6**: Player similarity analytics, hover state management improvements
- **v2.5**: Click-to-select functionality, collapsible info sections
- **v2.4**: Info panel visibility toggle, minimum dimensions
- **v2.1**: Expanded to use all 13 raw stats from Stats interface
- **v2**: PCA implementation, UI improvements, keyboard controls
- **v1**: Initial implementation with simple 3D projection

See `decisionLog.md` and `implementationLog.md` for detailed change history.

## Notes

- All decisions align with the design principles outlined in the codebase
- The system prioritizes clarity, correctness, and extensibility
- Architecture follows separation of concerns: data → processing → display
- The vectorization pipeline is pure and framework-agnostic (no React dependencies)

---

**For detailed design decisions and implementation history, see:**
- `decisionLog.md` - Design decisions and rationale
- `implementationLog.md` - Technical implementation details

## License

See LICENSE file for details.

