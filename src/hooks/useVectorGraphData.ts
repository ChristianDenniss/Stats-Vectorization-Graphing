// Data fetching hooks for the vector graph page
// API calls are commented out but ready to be used when connecting to real API
// Currently the app uses mock data directly in VectorGraphPage.tsx

import { useState, useEffect } from "react";
import type { Player, Season } from "../types/interfaces";
// import { mockPlayers, mockSeasons } from "../mockData/generateMockData";

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Configuration - adjust these to match your API endpoints
// When ready to connect to a real API, uncomment the fetch calls below
const API_BASE_URL = (process.env.REACT_APP_API_BASE_URL as string | undefined) || "http://localhost:3001/api";

/**
 * Fetches all players with their stats included
 * 
 * TO USE THIS HOOK WITH REAL API:
 * 1. Uncomment the fetch call below
 * 2. Remove or comment out the mock data section
 * 3. Adjust the endpoint and response structure to match your API
 * 4. Update VectorGraphPage.tsx to use this hook instead of direct mock data
 */
export function useFetchPlayersWithStats(): UseFetchResult<Player[]> {
  const [data, setData] = useState<Player[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchPlayers() {
      try {
        setLoading(true);
        setError(null);

        // API CALL - Uncomment to use real API
        /*
        const response = await fetch(`${API_BASE_URL}/players?includeStats=true`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch players: ${response.statusText}`);
        }

        const players: Player[] = await response.json();
        
        if (!cancelled) {
          setData(players);
          setLoading(false);
        }
        */
        
        // MOCK DATA - Currently commented out (app uses mock data directly)
        // Uncomment below if you want to use this hook with mock data:
        /*
        // Simulate API delay for realistic behavior
        await new Promise(resolve => setTimeout(resolve, 300));
        const players: Player[] = mockPlayers;
        
        if (!cancelled) {
          setData(players);
          setLoading(false);
        }
        */
        
        // For now, return empty data since we're using mock data directly
        if (!cancelled) {
          setData(null);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error fetching players");
          setLoading(false);
        }
      }
    }

    fetchPlayers();

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}

/**
 * Fetches all seasons
 * 
 * TO USE THIS HOOK WITH REAL API:
 * 1. Uncomment the fetch call below
 * 2. Remove or comment out the mock data section
 * 3. Adjust the endpoint and response structure to match your API
 * 4. Update VectorGraphPage.tsx to use this hook instead of direct mock data
 */
export function useFetchSeasons(): UseFetchResult<Season[]> {
  const [data, setData] = useState<Season[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchSeasons() {
      try {
        setLoading(true);
        setError(null);

        // API CALL - Uncomment to use real API
        /*
        const response = await fetch(`${API_BASE_URL}/seasons`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch seasons: ${response.statusText}`);
        }

        const seasons: Season[] = await response.json();
        
        if (!cancelled) {
          setData(seasons);
          setLoading(false);
        }
        */
        
        // MOCK DATA - Currently commented out (app uses mock data directly)
        // Uncomment below if you want to use this hook with mock data:
        /*
        // Simulate API delay for realistic behavior
        await new Promise(resolve => setTimeout(resolve, 200));
        const seasons: Season[] = mockSeasons;
        
        if (!cancelled) {
          setData(seasons);
          setLoading(false);
        }
        */
        
        // For now, return empty data since we're using mock data directly
        if (!cancelled) {
          setData(null);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error fetching seasons");
          setLoading(false);
        }
      }
    }

    fetchSeasons();

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}

