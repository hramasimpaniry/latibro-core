import Orbital from "../../src/Orbital"; // 'latibro-core'

const container = document.getElementById("orbital-container");
const config = {
  interactivity: {
    enabled: true,
  },
  panel: {
    // default panel settings : if not set on item level, default settings is applied
    // position : "center center",
    // dimension: {
    //   width: 600,
    //   height: 400,
    // },
  },
  orbits: [
    {
      items: [
        {
          src: "https://placehold.co/50",
          panel: {
            content: "<h1>Orbit 1, Item 1</h1>",
            position: "left bottom",
            dimension: {
              width: 400,
              height: 560,
            },
          },
        },
        {
          src: "https://placehold.co/50",
          panel: {
            content: "<h1>Orbit 1, Item 2</h1>",
            position: "right top",
            dimension: {
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
        {
          src: "https://placehold.co/50",
          panel: {
            position: "center top",
            dimension: {
              width: "80%",
              height: "50%",
            },
            customCss: "custom-panel",
            content: "<h1>Orbit 3, Item 1</h1>",
          },
        },
        {
          src: "https://placehold.co/50",
          panel: {
            position: "center bottom",
            dimension: {
              width: "80%",
              height: "50%",
            },
            content: "<h1>Orbit 3, Item 2</h1>",
          },
        },
        {
          src: "https://placehold.co/50",
          panel: {
            // position: if not set on item level, default panel settings are applied
            // dimension: if not set on item level, default panel settings are applied
            content: "<h1>Orbit 3, Item 3</h1>",
          },
        },
      ],
      speed: 100,
      customRadius: 100,
    },
  ],
};

new Orbital(container, config);
