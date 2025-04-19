import Orbital from "../../src/Orbital"; // 'latibro-core'

const container = document.getElementById("orbital-container");
const config = {
  interactivity: {
    enabled: true,
  },
  panel: {
    style: {
      top: document.documentElement.clientHeight / 2,
      left: document.documentElement.clientWidth / 2,
      width: 400,
      height: 600,
    },
  },
  orbits: [
    {
      items: [
        {
          src: "https://placehold.co/50",
          panel: {
            content: "<h1>Orbit 1, Item 1</h1>",
            style: {
              top: document.documentElement.clientHeight / 2,
              left: 220,
              width: 400,
              height: 600,
            },
          },
        },
        {
          src: "https://placehold.co/50",
          panel: {
            content: "<h1>Orbit 1, Item 2</h1>",
            style: {
              top: document.documentElement.clientHeight / 2,
              left: document.documentElement.clientWidth - 220,
              width: 400,
              height: 600,
            },
          },
        },
        "https://placehold.co/50",
      ],
      speed: 100,
    },
    {
      items: ["https://placehold.co/50", "https://placehold.co/50", "https://placehold.co/50"],
      speed: 100,
      customRadius: 80,
    },
    {
      items: [
        "https://placehold.co/50",
        "https://placehold.co/50",
        {
          src: "https://placehold.co/50",
          panel: {
            content: "<h1>Orbit 3, Item 1</h1>",
          },
        },
      ],
      speed: 100,
      customRadius: 100,
    },
  ],
};

new Orbital(container, config);
