import mirage from "../images/maps/mirage.jpg";
import inferno from "../images/maps/inferno.jpg";
import nuke from "../images/maps/nuke.jpg";
import dust2 from "../images/maps/dust2.jpg";
import anubis from "../images/maps/anubis.jpg";
import ancient from "../images/maps/ancient.jpg";
import overpass from "../images/maps/overpass.jpg";
import cache from "../images/maps/cache.jpeg";
import type { MapData } from "../types";

// Replace the placeholder lineup images/descriptions with your own.
export const maps: MapData[] = [
  {
    id: "dust2",
    name: "Dust II",
    image: dust2,
    lineups: [
      {
        id: "dust2-long-smoke",
        title: "Long Corner Smoke from T Spawn",
        side: "T",
        nadeType: "Smoke",
        image: dust2, // swap for an actual lineup screenshot
        description:
          "Stand at the edge of T spawn facing the long doors sign. Line up the crosshair with the tip of the sign and throw.",
      },
      {
        id: "dust2-xbox-smoke",
        title: "CT Xbox Smoke",
        side: "T",
        nadeType: "Smoke",
        image: dust2,
        description:
          "From mid, align with the antenna on the building, jump-throw to land the smoke on Xbox.",
      },
    ],
  },
  {
    id: "mirage",
    name: "Mirage",
    image: mirage,
    lineups: [
      {
        id: "mirage-jungle-smoke",
        title: "Jungle Smoke from T Ramp",
        side: "T",
        nadeType: "Smoke",
        image: mirage,
        description:
          "Stand at the corner of ramp, aim at the light fixture, run-throw.",
      },
    ],
  },
  { id: "nuke", name: "Nuke", image: nuke, lineups: [] },
  { id: "ancient", name: "Ancient", image: ancient, lineups: [] },
  { id: "inferno", name: "Inferno", image: inferno, lineups: [] },
  { id: "overpass", name: "Overpass", image: overpass, lineups: [] },
  { id: "anubis", name: "Anubis", image: anubis, lineups: [] },
  { id: "cache", name: "Cache", image: cache, lineups: [] },
];