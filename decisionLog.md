# Decision Log

This document tracks all architectural and implementation decisions made during the development of the Stats Vectorization & Graphing system.

---

## Design Decisions (from doc.md)

### Decision: Per-season embeddings
**Date**: Initial design  
**Why**
- Statistical environments differ across seasons.
- A season-scoped embedding ensures all players are compared within the same context.

**Consequence**
- Axes (e.g. PC1 / PC2 / PC3) are consistent within a season.
- Axes are not assumed to be semantically identical across seasons.

---

### Decision: Opportunity normalization via per-set rates
**Date**: Initial design  
**Why**
- Raw totals disproportionately reward playing time / opportunity.
- Per-set rates better represent how a player performs WHEN involved.
- Per set still has its flaws but it is the most accurate and objective method we have of normalization for this data.

**Consequence**
- Players are compared by rate of production.
- Small samples may introduce instability, handled separately.

---

### Decision: User-configurable minimum sets threshold
**Date**: Initial design  
**Why**
- Stability requirements vary by use case.
- Allowing the user to control the threshold preserves flexibility.

**Consequence**
- The threshold is applied as a **filter**, not as part of vector computation.
- Changing the threshold legitimately changes the population and geometry of the graph.

---

### Decision: Fixed-schema vectorization
**Date**: Initial design  
**Why**
- Distance metrics and projections require consistent dimensional meaning.
- A fixed schema allows reproducibility and comparison.

**Consequence**
- Feature lists and ordering are versioned.
- Schema changes require a version bump, not a rewrite.

---

### Decision: Neutral (unweighted) vectors in v1
**Date**: Initial design  
**Why**
- Weighting encodes subjective assumptions about importance of a stat
- Separating "what a player does" from "how valuable it is" keeps the base system clean and reusable.
- Once you start to add subjective aspects to a project like this, you can lose track of what is actually objectively true very quickly.

**Consequence**
- v1 vectors describe **statistical profiles**, not impact or quality.
- Value-weighted or role-aware models can be layered on later.

---

### Decision: 3D projection for visualization
**Date**: Initial design  
**Why**
- 3D preserves more information than 2D.
- Visualization is a core use case for exploration and intuition.
- Looks way cooler than 2D (cherry on top)

**Axis Interpretation**
- Axes are **emergent**, not pre-assigned (e.g. PCA components).
- Axis meaning is derived post-hoc from contributing features.

**Consequence**
- Axis interpretations may change season-to-season.
- Axes are described, not named absolutely.

---

## Implementation Decisions

### Decision: React + TypeScript stack
**Date**: Implementation phase  
**Why**
- React provides component-based architecture for UI
- TypeScript ensures type safety for complex data transformations
- React Three Fiber provides declarative 3D rendering that integrates well with React

**Consequence**
- Full type safety throughout the codebase
- Easy to maintain and extend
- Modern development experience with hot reloading

---

### Decision: React Three Fiber for 3D visualization
**Date**: Implementation phase  
**Why**
- Declarative 3D rendering that integrates seamlessly with React
- Built on Three.js, providing powerful 3D capabilities
- @react-three/drei provides useful helpers (OrbitControls, Html labels)

**Consequence**
- 3D graph is a React component, easy to integrate
- Can leverage React state management for interactions
- Good performance for interactive 3D scenes

---

### Decision: Simple 3D projection (first 3 dimensions) for v1
**Date**: Implementation phase  
**Why**
- Quick to implement and test the visualization pipeline
- Documented as placeholder - PCA planned for v2
- Allows immediate testing of the full system

**Consequence**
- v1 uses simple dimensional projection (x=dim0, y=dim1, z=dim2)
- Visualization works but doesn't preserve maximum variance
- Easy to swap out for PCA in v2 without changing component structure

---

### Decision: Project structure with src/ subdirectories
**Date**: Implementation phase  
**Why**
- Clear separation of concerns
- Analytics layer separate from presentation layer
- Easy to navigate and maintain

**Structure**:
```
src/
  analytics/     # Pure functions, no React dependencies
  components/    # React UI components
  hooks/         # React hooks for data fetching
  styles/        # CSS files
  types/         # TypeScript type definitions
  utils/         # Utility functions and mock data
```

**Consequence**
- Clean separation allows analytics to be tested independently
- Easy to find and modify specific functionality
- Scales well as project grows

---

### Decision: Mock data by default with API-ready structure
**Date**: Implementation phase  
**Why**
- Allows immediate testing without backend setup
- Hooks structured to look like API calls for easy transition
- Mock data includes varied player profiles for comprehensive testing

**Implementation**:
- Hooks use mock data internally but structured like API calls
- Commented fetch code shows exactly how to swap to real API
- Simulated API delay (200-300ms) for realistic behavior

**Consequence**
- System works out of the box for testing
- Easy migration path when backend is ready
- No need to modify components when switching to real API

---

### Decision: Default minimum sets threshold of 5
**Date**: Implementation phase  
**Why**
- Reasonable default that filters out very small samples
- User can adjust via slider (1-50 range)
- Balances between including enough players and filtering noise

**Consequence**
- Players with < 5 sets are excluded by default
- User can lower threshold to see more players or raise for more stability

---

### Decision: Z-score normalization within season population
**Date**: Implementation phase  
**Why**
- Standardizes features to have mean=0, std=1
- Makes features comparable across different scales
- Handles zero-variance features safely (returns 0)

**Implementation**:
- Computes population mean/std for each feature across all players in season
- Applies (value - mean) / std for each player's feature
- Zero-variance features return 0 for all players

**Consequence**
- All features are on the same scale
- Distance metrics work correctly
- Players are compared relative to season population

---

### Decision: Sets played calculation from game scores
**Date**: Implementation phase  
**Why**
- Sets are embedded in game scores (team1Score + team2Score)
- Matches the logic used in StatsLeaderboard
- Accurate representation of playing time

**Consequence**
- Sets played is sum of (team1Score + team2Score) across all games in season
- Per-set rates are computed correctly

---

### Decision: 12-dimensional feature vector
**Date**: Implementation phase  
**Why**
- Comprehensive coverage of player statistical profile
- Includes offensive, defensive, and efficiency metrics
- Fixed order ensures reproducibility

**Features** (in order):
1. killsPerSet
2. attemptsPerSet
3. totalSpikePct
4. spikePct
5. apePct
6. blocksPerSet
7. assistsPerSet
8. acesPerSet
9. digsPerSet
10. receivesPerSet
11. errorsPerSet
12. plusMinusPerSet

**Consequence**
- Consistent vector representation across all players
- Versioned (v1) - changes require version bump
- All features are per-set rates (except percentages)

---

### Decision: Error handling in data hooks
**Date**: Implementation phase  
**Why**
- Graceful degradation when data fails to load
- User-friendly error messages
- Loading states for better UX

**Implementation**:
- Hooks return { data, loading, error } pattern
- Cancellation tokens prevent state updates after unmount
- Error messages displayed in UI

**Consequence**
- App doesn't crash on data errors
- Users see helpful error messages
- Loading states prevent flash of empty content

---

### Decision: Mock data with 8 varied player profiles
**Date**: Implementation phase  
**Why**
- Comprehensive testing of different statistical profiles
- Tests edge cases (low volume, high errors, etc.)
- Realistic data structure matching expected API format

**Player Profiles**:
1. High-volume attacker (lots of kills, high attempts)
2. Efficient attacker (high percentage, moderate volume)
3. Defensive specialist (high digs, blocks, low errors)
4. Setter/all-around (high assists, balanced stats)
5. High-error player (lots of attempts, many errors)
6. Balanced player (moderate across all categories)
7. Low-volume player (few sets, for testing thresholds)
8. High ace server (lots of aces, high serving errors)

**Consequence**
- System can be tested immediately
- Visualization shows varied player distributions
- Threshold filtering can be tested with low-volume player

---

### Decision: React hooks pattern for data fetching
**Date**: Implementation phase  
**Why**
- Standard React pattern for async data
- Reusable across components
- Handles loading/error states automatically

**Implementation**:
- Custom hooks: `useFetchPlayersWithStats()`, `useFetchSeasons()`
- Return consistent interface: `{ data, loading, error }`
- Use useEffect with cleanup for async operations

**Consequence**
- Clean component code
- Data fetching logic is reusable
- Easy to test hooks independently

---

### Decision: useMemo for vector computation
**Date**: Implementation phase  
**Why**
- Expensive computation (aggregation, normalization)
- Only recompute when inputs change (players, season, threshold)
- Prevents unnecessary recalculations on every render

**Consequence**
- Better performance, especially with large player sets
- Vectors only recomputed when relevant inputs change

---

### Decision: CSS modules approach (separate CSS files)
**Date**: Implementation phase  
**Why**
- Clear separation of styles per component
- Easy to maintain and modify
- No CSS-in-JS overhead

**Consequence**
- Styles are scoped to components
- Easy to find and update styling
- Traditional CSS approach, familiar to developers

---

### Decision: TypeScript interfaces for all data structures
**Date**: Implementation phase  
**Why**
- Type safety prevents runtime errors
- Self-documenting code
- IDE autocomplete and type checking

**Key Interfaces**:
- `Player`, `Stats`, `Game`, `Season` (from types/interfaces.ts)
- `PlayerSeasonVectorRow` (from statsVectorization.ts)
- `VectorFeatureKey` (union type for feature names)

**Consequence**
- Compile-time error checking
- Better developer experience
- Clear contracts between modules

---

### Decision: Create React App (CRA) for build tooling
**Date**: Implementation phase  
**Why**
- Zero-configuration setup
- Handles TypeScript, bundling, dev server
- Standard tooling that most React developers know

**Consequence**
- Quick setup, no build configuration needed
- Standard React development experience
- Easy to eject if custom configuration needed later

---

## Future Decisions (Planned)

### Decision: PCA-based 3D projection (v2)
**Status**: Planned  
**Why**
- Preserves maximum variance in first 3 principal components
- Better visualization than simple dimensional projection
- Can provide axis interpretations from loadings

**Implementation Notes**:
- Replace `projectZVectorTo3D()` with PCA implementation
- Store loadings for axis description
- May need to add PCA library (e.g., ml-matrix, ml-pca)

---

## Notes

- All decisions are documented with rationale and consequences
- Design decisions from doc.md are preserved here for completeness
- Implementation decisions focus on technical choices made during development
- Future decisions are marked as "Planned" for tracking

