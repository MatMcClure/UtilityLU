import mirage from "../images/maps/mirage.jpg";
import inferno from "../images/maps/inferno.jpg";
import nuke from "../images/maps/nuke.jpg";
import dust2 from "../images/maps/dust2.jpg";
import dust2Spawn from "../images/maps/dust2_spawn.jpg";
import dust2A from "../images/maps/dust2_a.jpg";
import dust2B from "../images/maps/dust2_b.jpg";
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
        title: "Suicide Mid Door Smoke",
        side: "T",
        nadeType: "Smoke",
        image: dust2Spawn, // swap for an actual lineup screenshot
        description:
          "",
      },
      {
        id: "dust2-long-smoke",
        title: "Barrell Mid Door Smoke",
        side: "T",
        nadeType: "Smoke",
        image: dust2Spawn, // swap for an actual lineup screenshot
        description:
          "",
      },
      {
        id: "dust2-long-smoke",
        title: "Long Corner Smoke from T Spawn",
        side: "T",
        nadeType: "Smoke",
        image: dust2Spawn, // swap for an actual lineup screenshot
        description:
          "",
      },
      {
        id: "dust2-long-smoke",
        title: "Long Corner Smoke from T Spawn",
        side: "T",
        nadeType: "Smoke",
        image: dust2Spawn, // swap for an actual lineup screenshot
        description:
          "Stand at the edge of T spawn facing the long doors sign. Line up the crosshair with the tip of the sign and throw.",
      },
      {
        id: "dust2-xbox-smoke",
        title: "CT Xbox Smoke",
        side: "T",
        nadeType: "Smoke",
        image: dust2Spawn,
        description:
          "From mid, align with the antenna on the building, jump-throw to land the smoke on Xbox.",
      },
      {
        id: "dust2-b-smoke",
        title: "Door Smoke",
        side: "T",
        nadeType: "Smoke",
        image: dust2B,
        description:
          "",
      },
      {
        id: "dust2-b-smoke",
        title: "Window Smoke",
        side: "T",
        nadeType: "Smoke",
        image: dust2B,
        description:
          "",
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
  {
    id: "nuke",
    name: "Nuke",
    image: nuke,
    lineups: [
      {
        id: "nuke-outdoor-smoke",
        title: "",
        side: "T",
        nadeType: "Smoke",
        image: nuke,
        description:
          "",
      },
    ],
  },
    {
    id: "ancient",
    name: "Ancient",
    image: ancient,
    lineups: [
      {
        id: "",
        title: "",
        side: "T",
        nadeType: "Smoke",
        image: ancient,
        description:
          "",
      },
    ],
  },
    {
    id: "inferno",
    name: "Inferno",
    image: inferno,
    lineups: [
      {
        id: "",
        title: "",
        side: "T",
        nadeType: "Smoke",
        image: inferno,
        description:
          "",
      },
    ],
  },
    {
    id: "overpass",
    name: "Overpass",
    image: overpass,
    lineups: [
      {
        id: "",
        title: "",
        side: "T",
        nadeType: "Smoke",
        image: overpass,
        description:
          "",
      },
    ],
  },
    {
    id: "anubis",
    name: "Anubis",
    image: anubis,
    lineups: [
      {
        id: "",
        title: "",
        side: "T",
        nadeType: "Smoke",
        image: anubis,
        description:
          "",
      },
    ],
  },
    {
    id: "cache",
    name: "Cache",
    image: cache,
    lineups: [
      {
        id: "",
        title: "",
        side: "T",
        nadeType: "Smoke",
        image: cache,
        description:
          "",
      },
    ],
  },
];
