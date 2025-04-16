import Orbital from "../../src/Orbital"; // 'latibro-core'

const container = document.getElementById("orbital-container");
const config = {
  interactivity: true,
  panel: {
    container: document.body,
  },
  orbits: [
    {
      items: ["https://placehold.co/50", "https://placehold.co/50", "https://placehold.co/50"],
      speed: 100,
    },
    {
      items: ["https://placehold.co/50", "https://placehold.co/50", "https://placehold.co/50"],
      speed: 100,
      customRadius: 80,
    },
    {
      items: ["https://placehold.co/50", "https://placehold.co/50", "https://placehold.co/50"],
      speed: 100,
      customRadius: 100,
    },
  ],
};

new Orbital(container, config);
