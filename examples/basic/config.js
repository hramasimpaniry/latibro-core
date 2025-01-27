import Orbital from "latibro-core";

const container = document.getElementById("orbital-container");
const config = {
  orbits: [
    {
      items: [
        "https://placehold.co/50",
        "https://placehold.co/50",
        "https://placehold.co/50",
      ],
      speed: 10,
    },
  ],
};

new Orbital(container, config);
