import Orbital from "../../src/Orbital"; // 'latibro-core'

const container = document.getElementById("orbital-container");
const config = {
  container: {
    styles: {
      backgroundColor: "#ff5733",
      border: "2px solid #000",
      padding: "10px",
    },
    customCss: "custom-css border-lg border-rounded",
  },
  orbits: [
    {
      items: [
        "https://placehold.co/50",
        "https://placehold.co/50",
        "https://placehold.co/50",
      ],
      speed: 12,
    },
  ],
};

new Orbital(container, config);
