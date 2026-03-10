import type { Club, NumberHistory, Player } from '@/types';

const TRANSFERMARKT_URL = 'https://transfermarkt-api-xi.vercel.app';
const REVALIDATE = 3600; // 1 hour

// Neutral fallback colors for national teams whose colors can't be fetched
const INTERNATIONAL_COLORS = ['#4b5563', '#f9fafb', '#4b5563'];

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

interface ClubSearchResult {
  id: string;
  name: string;
  colors?: string[];
}

// Resolve national team names by searching for each of the player's citizenships.
// The /clubs/profile endpoint returns 500 for national teams, but /clubs/search works.
async function resolveNationalTeams(unresolvedIds: Set<string>, citizenships: string[]): Promise<Map<string, Club>> {
  const map = new Map<string, Club>();
  if (unresolvedIds.size === 0 || citizenships.length === 0) return map;

  try {
    // Search for national teams by each citizenship in parallel
    const searchResults = await Promise.all(
      citizenships.map((country) =>
        fetch(`${TRANSFERMARKT_URL}/clubs/search/${encodeURIComponent(country)}`, {
          next: { revalidate: REVALIDATE },
        })
          .then((r) => (r.ok ? r.json() : { results: [] }))
          .catch(() => ({ results: [] })),
      ),
    );

    for (const data of searchResults) {
      for (const club of (data.results ?? []) as ClubSearchResult[]) {
        if (unresolvedIds.has(club.id) && !map.has(club.id)) {
          map.set(club.id, {
            id: club.id,
            name: club.name,
            colors: club.colors?.length ? club.colors : INTERNATIONAL_COLORS,
          });
        }
      }
    }
  } catch {
    // Fall through — unresolved IDs will get the generic fallback below
  }

  return map;
}

export interface PlayerHistory {
  clubs: NumberHistory[];
  international: NumberHistory[];
}

export async function getNumberHistory(id: string): Promise<PlayerHistory> {
  // Fetch jersey numbers and player profile in parallel
  const [response, profileRes] = await Promise.all([
    fetch(`${TRANSFERMARKT_URL}/players/${id}/jersey_numbers`, {
      next: { revalidate: REVALIDATE },
    }),
    fetch(`${TRANSFERMARKT_URL}/players/${id}/profile`, {
      next: { revalidate: REVALIDATE },
    }),
  ]);

  if (!response.ok) {
    throw new Error(`Failed to fetch jersey numbers: ${response.status} ${response.statusText}`);
  }

  const data: NumberHistoryResponse = await response.json();
  const citizenships: string[] = profileRes.ok ? ((await profileRes.json()).citizenship ?? []) : [];
  const uniqueIds = [...new Set(data.jerseyNumbers.map((e) => e.club))];

  // Fetch all club profiles in parallel
  const clubResults = await Promise.all(uniqueIds.map((clubId) => getClub(clubId)));

  const clubCache = new Map<string, Club>();
  const nationalTeamIds = new Set<string>();

  for (let i = 0; i < uniqueIds.length; i++) {
    const club = clubResults[i];
    if (club) {
      clubCache.set(uniqueIds[i], club);
    } else {
      nationalTeamIds.add(uniqueIds[i]);
    }
  }

  // Attempt to resolve national team names from the player's citizenships
  const nationalTeamCache = await resolveNationalTeams(nationalTeamIds, citizenships);

  // Anything still unresolved gets a generic fallback
  for (const teamId of nationalTeamIds) {
    if (!nationalTeamCache.has(teamId)) {
      nationalTeamCache.set(teamId, {
        id: teamId,
        name: 'International',
        colors: INTERNATIONAL_COLORS,
      });
    }
  }

  const clubs: NumberHistory[] = [];
  const international: NumberHistory[] = [];

  for (const entry of data.jerseyNumbers) {
    const club = clubCache.get(entry.club);
    if (club) {
      clubs.push({ season: entry.season, club, jerseyNumber: entry.jerseyNumber });
      continue;
    }
    const nationalTeam = nationalTeamCache.get(entry.club);
    if (nationalTeam) {
      international.push({ season: entry.season, club: nationalTeam, jerseyNumber: entry.jerseyNumber });
    }
  }

  return { clubs, international };
}
