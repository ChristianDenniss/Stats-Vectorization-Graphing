// src/hooks/useVectorGraphData.ts
// Data fetching hooks for the vector graph page
// Currently the app uses mock data directly in VectorGraphPage.tsx
// To use these hooks, uncomment the code below and comment out the mock data in VectorGraphPage.tsx

import { useEffect, useState } from "react";
// import { authFetch } from "./authFetch";
import type { Player, Season } from "../types/interfaces";

/**
 * Hook to fetch all players with their stats (includes game and season relations)
 * This is needed for vectorization which requires stats with game.season data
 * 
 * TO USE THIS HOOK:
 * 1. Create authFetch utility file or uncomment the import
 * 2. Uncomment the code below
 * 3. Comment out mock data usage in VectorGraphPage.tsx
 */
export const useFetchPlayersWithStats = () => {
  const [data, setData] = useState<Player[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // COMMENTED OUT - Using mock data directly in VectorGraphPage instead
  // const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
  // 
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await authFetch(`${backendUrl}/api/players`, {
  //         method: "GET"
  //       });
  //
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //
  //       const result: Player[] = await response.json();
  //       setData(result);
  //     } catch (err: any) {
  //       console.error("Fetch error [players]:", err);
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //
  //   fetchData();
  // }, []);

  // Return empty state since we're using mock data
  useEffect(() => {
    setLoading(false);
  }, []);

  return { data, loading, error };
};

/**
 * Hook to fetch all seasons
 * Used for the season selector dropdown
 * 
 * TO USE THIS HOOK:
 * 1. Create authFetch utility file or uncomment the import
 * 2. Uncomment the code below
 * 3. Comment out mock data usage in VectorGraphPage.tsx
 */
export const useFetchSeasons = () => {
  const [data, setData] = useState<Season[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // COMMENTED OUT - Using mock data directly in VectorGraphPage instead
  // const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
  //
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Use /skinny endpoint to avoid loading unnecessary relations
  //       const response = await authFetch(`${backendUrl}/api/seasons/skinny`, {
  //         method: "GET"
  //       });
  //
  //       if (!response.ok) {
  //         throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
  //       }
  //
  //       const result: Season[] = await response.json();
  //       setData(result);
  //     } catch (err: any) {
  //       console.error("Fetch error [seasons]:", err);
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //
  //   fetchData();
  // }, []);

  // Return empty state since we're using mock data
  useEffect(() => {
    setLoading(false);
  }, []);

  return { data, loading, error };
};

