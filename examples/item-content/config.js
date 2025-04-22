import Orbital from "../../src/Orbital"; // 'latibro-core'

const container = document.getElementById("orbital-container");
const config = {
  orbits: [
    {
      items: [
        "https://placehold.co/50",
        "https://placehold.co/50",
        {
          thumbnail: {
            content: "<span>Line 1</span><span>Line 2</span><span>Line 3</span>",
            customCss: "item-thumbnail-custom",
          },
        },
      ],
      speed: 100,
    },
  ],
};

new Orbital(container, config);
