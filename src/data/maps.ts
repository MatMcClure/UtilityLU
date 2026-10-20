import mirage from "../images/maps/mirage.jpg";
import inferno from "../images/maps/inferno.jpg";
import nuke from "../images/maps/nuke.jpg";
import dust2 from "../images/maps/dust2.jpg";
import anubis from "../images/maps/anubis.jpg";
import ancient from "../images/maps/ancient.jpg";
import overpass from "../images/maps/overpass.jpg";
import cache from "../images/maps/cache.jpeg";
import lineupsData from "./lineups.json";
import { mediaUrl } from "../utils/media";
import type { MapData, Lineup } from "../types";

interface RawLineup {
  id: string;
  title: string;
  side: "T" | "CT";
  nadeType: "Smoke" | "Flash" | "Molotov" | "HE";
  description: string;
  image: string;
  video?: string;
  detailImages?: string[];
}

const rawLineups = lineupsData as Record<string, RawLineup[]>;

const toLineup = (raw: RawLineup): Lineup => ({
  id: raw.id,
  title: raw.title,
  side: raw.side,
  nadeType: raw.nadeType,
  description: raw.description,
  image: mediaUrl(raw.image),
  ...(raw.video && { video: mediaUrl(raw.video) }),
  ...(raw.detailImages && {
    detailImages: raw.detailImages.map(mediaUrl),
  }),
});

const baseMaps: Omit<MapData, "lineups">[] = [
  { id: "dust2", name: "Dust II", image: dust2 },
  { id: "mirage", name: "Mirage", image: mirage },
  { id: "nuke", name: "Nuke", image: nuke },
  { id: "ancient", name: "Ancient", image: ancient },
  { id: "inferno", name: "Inferno", image: inferno },
  { id: "overpass", name: "Overpass", image: overpass },
  { id: "anubis", name: "Anubis", image: anubis },
  { id: "cache", name: "Cache", image: cache },
];

export const maps: MapData[] = baseMaps.map((map) => ({
  ...map,
  lineups: (rawLineups[map.id] ?? []).map(toLineup),
}));