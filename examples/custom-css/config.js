import Orbital from "../../src/Orbital"; // 'latibro-core'

const container = document.getElementById("orbital-container");
const config = {
  orbits: [
    {
      items: [
        "https://placehold.co/50",
        "https://placehold.co/50",
        "https://placehold.co/50",
      ],
      customCss: "orbit-custom",
      speed: 12,
    },
  ],
};

new Orbital(container, config);
