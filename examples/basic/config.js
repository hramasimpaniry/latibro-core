import Orbital from "../../src/Orbital"; // 'latibro-core'

const container = document.getElementById("orbital-container");
const config = {
  container: {
    styles: {
      width: "500px",
      height: "500px",
    },
  },
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
