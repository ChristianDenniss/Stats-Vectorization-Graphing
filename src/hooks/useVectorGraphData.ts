// Data fetching hooks for the vector graph page
// Currently using mock data, but structured to easily swap to real API calls

import { useState, useEffect } from "react";
import type { Player, Season } from "../types/interfaces";
import { mockPlayers, mockSeasons } from "../utils/mockData";

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Configuration - adjust these to match your API endpoints
// When ready to connect to a real API, uncomment the fetch calls below
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001/api";

/**
 * Fetches all players with their stats included
 * Currently returns mock data. To connect to a real API:
 * 1. Remove the mock data import and usage
 * 2. Uncomment the fetch call below
 * 3. Adjust the endpoint and response structure to match your API
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

        // Simulate API delay for realistic behavior
        await new Promise(resolve => setTimeout(resolve, 300));

        // MOCK DATA - Currently using mock data
        // To use real API, replace this section with:
        /*
        const response = await fetch(`${API_BASE_URL}/players?includeStats=true`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch players: ${response.statusText}`);
        }

        const players: Player[] = await response.json();
        */
        
        const players: Player[] = mockPlayers;
        
        if (!cancelled) {
          setData(players);
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
 * Currently returns mock data. To connect to a real API:
 * 1. Remove the mock data import and usage
 * 2. Uncomment the fetch call below
 * 3. Adjust the endpoint and response structure to match your API
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

        // Simulate API delay for realistic behavior
        await new Promise(resolve => setTimeout(resolve, 200));

        // MOCK DATA - Currently using mock data
        // To use real API, replace this section with:
        /*
        const response = await fetch(`${API_BASE_URL}/seasons`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch seasons: ${response.statusText}`);
        }

        const seasons: Season[] = await response.json();
        */
        
        const seasons: Season[] = mockSeasons;
        
        if (!cancelled) {
          setData(seasons);
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

