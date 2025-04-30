import Orbital from "../../src/Orbital"; // 'latibro-core'

const container = document.getElementById("orbital-container");
const config = {
  interactivity: {
    enabled: true,
  },
  panel: {
    // defaults for all panels
    style: {
      width: 600,
      height: 400,
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
              position: "left bottom",
              width: 400,
              height: 560,
            },
          },
        },
        {
          src: "https://placehold.co/50",
          panel: {
            content: "<h1>Orbit 1, Item 2</h1>",
            style: {
              position: "right top",
              width: 400,
              height: 560,
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
