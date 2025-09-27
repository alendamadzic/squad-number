export interface Player {
  id: string;
  name: string;
  shirtNumber: string;
  club: Club;
}

export interface Club {
  id: string;
  name: string;
  colors: string[];
}

export interface NumberHistory {
  season: string;
  jerseyNumber: number;
  club: string; // ID to club
}
