'use server';

import type { Player } from '@/types';

const TRANSFERMARKT_URL = 'https://transfermarkt-api-xi.vercel.app';

interface SearchResultPlayer {
  id: string;
  name: string;
  position?: string;
  club: { id: string; name: string };
}

export async function searchPlayers(query: string): Promise<Player[]> {
  query = query.trim();
  if (!query) return [];

  try {
    const response = await fetch(`${TRANSFERMARKT_URL}/players/search/${encodeURIComponent(query)}`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return [];

    const data = await response.json();
    if (data.results && Array.isArray(data.results)) {
      return data.results.map((p: SearchResultPlayer) => ({
        id: p.id,
        name: p.name,
        position: p.position ?? null,
        shirtNumber: '',
        club: { id: p.club.id, name: p.club.name, colors: [] },
      }));
    }
    return [];
  } catch {
    return [];
  }
}
