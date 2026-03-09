export interface Player {
  id: string;
  name: string;
  shirtNumber: string;
  position?: string | null;
  club: Club;
}

export interface Club {
  id: string;
  name: string;
  colors: string[];
}

export interface NumberHistory {
  season: string;
  club: Club;
  jerseyNumber: number;
}
