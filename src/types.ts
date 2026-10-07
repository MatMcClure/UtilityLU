export interface Lineup {
  id: string;
  title: string;
  side: "T" | "CT";
  nadeType: "Smoke" | "Flash" | "Molotov" | "HE";
  image: string;
  description: string;
  video?: string;
  detailImages?: string[];
}

export interface MapData {
  id: string;
  name: string;
  image: string;
  lineups: Lineup[];
}

export interface LineupSearchResult extends Lineup {
  mapId: string;
  mapName: string;
}
