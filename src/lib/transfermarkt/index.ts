import type { Club, NumberHistory, Player } from '@/types';

const TRANSFERMARKT_URL = 'https://transfermarkt-api-xi.vercel.app';
const REVALIDATE = 3600; // 1 hour

export async function getPlayer(id: string): Promise<Player | null> {
  try {
    const response = await fetch(`${TRANSFERMARKT_URL}/players/${id}/profile`, {
      next: { revalidate: REVALIDATE },
    });
    if (!response.ok) return null;

    const player = await response.json();
    if (!player?.club?.id) return player;

    const club = await getClub(player.club.id);
    player.club = club ?? player.club;

    return player;
  } catch {
    return null;
  }
}

export async function getClub(id: string): Promise<Club | null> {
  try {
    const response = await fetch(`${TRANSFERMARKT_URL}/clubs/${id}/profile`, {
      next: { revalidate: REVALIDATE },
    });
    if (!response.ok) return null;

    const data = await response.json();
    if (data?.message === 'Internal Server Error') return null;

    return data;
  } catch {
    return null;
  }
}

interface NumberHistoryResponse {
  id: string;
  jerseyNumbers: { season: string; club: string; jerseyNumber: number }[];
}

export async function getNumberHistory(id: string): Promise<NumberHistory[]> {
  const response = await fetch(`${TRANSFERMARKT_URL}/players/${id}/jersey_numbers`, {
    next: { revalidate: REVALIDATE },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch jersey numbers: ${response.status} ${response.statusText}`);
  }

  const data: NumberHistoryResponse = await response.json();
  const uniqueClubIds = [...new Set(data.jerseyNumbers.map((e) => e.club))];

  // Fetch all clubs in parallel
  const clubResults = await Promise.all(uniqueClubIds.map((clubId) => getClub(clubId)));
  const clubCache = new Map<string, Club>();
  for (let i = 0; i < uniqueClubIds.length; i++) {
    const club = clubResults[i];
    if (club) clubCache.set(uniqueClubIds[i], club);
  }

  return data.jerseyNumbers
    .map((entry) => {
      const club = clubCache.get(entry.club);
      if (!club) return null;
      return { season: entry.season, club, jerseyNumber: entry.jerseyNumber };
    })
    .filter((entry): entry is NumberHistory => entry !== null);
}
