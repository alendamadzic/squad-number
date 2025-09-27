'use server';

import type { Club, NumberHistory, Player } from '@/types';

const TRANSFERMARKT_URL = 'https://transfermarkt-api.fly.dev';

export async function getPlayer(id: string): Promise<Player> {
  const response = await fetch(`${TRANSFERMARKT_URL}/players/${id}/profile`);
  const player = await response.json();

  const club = await getClub(player.club.id);
  player.club = club;

  return player;
}

export async function getClub(id: string): Promise<Club> {
  const response = await fetch(`${TRANSFERMARKT_URL}/clubs/${id}/profile`);
  const data = await response.json();
  return data;
}

interface NumberHistoryResponse {
  id: string;
  jerseyNumbers: [
    {
      season: string;
      club: string;
      jerseyNumber: number;
    },
  ];
}

export async function getNumberHistory(id: string): Promise<NumberHistory[]> {
  const response = await fetch(`${TRANSFERMARKT_URL}/players/${id}/jersey_numbers`);
  if (!response.ok) {
    throw new Error(`Failed to fetch jersey numbers: ${response.status} ${response.statusText}`);
  }

  const data: NumberHistoryResponse = await response.json();

  // Get unique club IDs to avoid duplicate API calls
  const uniqueClubIds = [...new Set(data.jerseyNumbers.map((entry) => entry.club))];

  // Fetch club details with rate limiting (2 calls per 3 seconds = 1.5s delay)
  const clubCache = new Map<string, Club>();
  let requestCount = 0;

  for (const clubId of uniqueClubIds) {
    try {
      const club = await getClub(clubId);
      clubCache.set(clubId, club);
      requestCount++;

      // Rate limit: 2 requests per 3 seconds (1.5s delay between requests)
      // Skip delay on the last request
      if (requestCount < uniqueClubIds.length) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
    } catch (error) {
      console.error(`Failed to fetch club ${clubId}:`, error);
      requestCount++;

      // Still add delay even on failure to respect rate limits
      if (requestCount < uniqueClubIds.length) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
      // Continue with other clubs even if one fails
    }
  }

  // Convert jersey numbers to NumberHistory format using cached club data
  const numberHistory: NumberHistory[] = data.jerseyNumbers.map((entry) => {
    const club = clubCache.get(entry.club);
    if (!club) {
      // Fallback: create a minimal club object if we couldn't fetch the full details
      return {
        season: entry.season,
        club: {
          id: entry.club,
          name: `Club ${entry.club}`,
          colors: [],
        },
        jerseyNumber: entry.jerseyNumber,
      };
    }

    return {
      season: entry.season,
      club: club,
      jerseyNumber: entry.jerseyNumber,
    };
  });

  return numberHistory;
}

interface SearchResultPlayer {
  id: string;
  name: string;
  club: {
    id: string;
    name: string;
  };
}

export async function searchPlayers(query: string): Promise<Player[]> {
  query = query.trim();
  if (!query) {
    return [];
  }

  const response = await fetch(`${TRANSFERMARKT_URL}/players/search/${encodeURIComponent(query)}`);
  const data = await response.json();

  // The API returns { results: [...] } structure
  if (data.results && Array.isArray(data.results)) {
    return data.results.map((player: SearchResultPlayer) => ({
      id: player.id,
      name: player.name,
      shirtNumber: '', // Not available in search results
      club: {
        id: player.club.id,
        name: player.club.name,
        colors: [], // Not available in search results
      },
    }));
  }

  return [];
}
