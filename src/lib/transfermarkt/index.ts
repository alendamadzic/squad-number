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

export async function getNumberHistory(id: string): Promise<NumberHistory> {
  const response = await fetch(`${TRANSFERMARKT_URL}/players/${id}/jersey_numbers`);
  const data = await response.json();
  return data;
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
