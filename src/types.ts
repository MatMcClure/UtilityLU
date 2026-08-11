export interface Lineup {
  id: string;
  title: string;          // e.g. "A Site Smoke from T Spawn"
  side: "T" | "CT";
  nadeType: "Smoke" | "Flash" | "Molotov" | "HE";
  image: string;           // screenshot of the lineup position
  description: string;     // throw instructions
}

export interface MapData {
  id: string;
  name: string;
  image: string;
  lineups: Lineup[];
}