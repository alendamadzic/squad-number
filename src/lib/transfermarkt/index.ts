'use server';

import type { Club, NumberHistory, Player } from '@/types';

const TRANSFERMARKT_URL = 'https://transfermarkt-api-xi.vercel.app';

export async function getPlayer(id: string): Promise<Player> {
  const response = await fetch(`${TRANSFERMARKT_URL}/players/${id}/profile`);
  const player = await response.json();

  const club = await getClub(player.club.id);
  player.club = club;

  return player;
}

export async function getClub(id: string): Promise<Club | null> {
  const response = await fetch(`${TRANSFERMARKT_URL}/clubs/${id}/profile`);
  if (response.ok) {
    const data = await response.json();
    if (data && typeof data === 'object' && data.message === 'Internal Server Error') {
      return null;
    }

    return data;
  }

  return null;
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

  // Fetch club details and filter out invalid clubs (500 errors)
  const clubCache = new Map<string, Club>();

  for (const clubId of uniqueClubIds) {
    const club = await getClub(clubId);
    if (club) {
      clubCache.set(clubId, club);
    }
  }

  // Convert jersey numbers to NumberHistory format, filtering out entries with invalid clubs
  const numberHistory: NumberHistory[] = data.jerseyNumbers
    .map((entry) => {
      const club = clubCache.get(entry.club);
      if (!club) {
        return null;
      }

      return {
        season: entry.season,
        club: club,
        jerseyNumber: entry.jerseyNumber,
      };
    })
    .filter((entry): entry is NumberHistory => entry !== null);

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
