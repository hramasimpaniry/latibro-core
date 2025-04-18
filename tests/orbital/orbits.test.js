import { describe, it, expect, beforeEach, afterEach } from "vitest";
import Orbital from "../../src/Orbital";

let container;
let orbital;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  orbital?.destroy();
  container?.remove();
});

describe("Orbital: Orbits", () => {
  it("should apply default CSS", async () => {
    // options
    const options = {
      orbits: [
        {
          items: ["https://placehold.co/50", "https://placehold.co/50", "https://placehold.co/50"],
        },
      ],
    };

    // init
    orbital = new Orbital(container, options);

    // elements
    const orbit = container.querySelector(".orbit-0");

    // tests
    await expect.element(orbit).toHaveClass("orbit orbit-0");
    await expect.element(orbit).toHaveStyle({ border: "2px dashed white" });
  });

  it("should apply custom CSS", async () => {
    // options
    const options = {
      orbits: [
        {
          items: ["https://placehold.co/50", "https://placehold.co/50", "https://placehold.co/50"],
          customCss: "custom-orbit",
        },
      ],
    };

    // style
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
      .custom-orbit {
        border: solid 1px red;
      }
    `;
    document.head.appendChild(styleTag);

    // init
    orbital = new Orbital(container, options);

    // elements
    const orbit = container.querySelector(".orbit-0");

    // tests
    await expect.element(orbit).toHaveStyle({ border: "solid 1px red" });
  });

  it("should apply custom styles", async () => {
    // options
    const options = {
      orbits: [
        {
          items: ["https://placehold.co/50", "https://placehold.co/50", "https://placehold.co/50"],
          customCss: "custom-orbit",
          style: {
            borderStyle: "dotted",
          },
        },
      ],
    };

    // style
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
      .custom-orbit {
        border-style: solid;
      }
    `;
    document.head.appendChild(styleTag);

    // init
    orbital = new Orbital(container, options);

    // elements
    const orbit = container.querySelector(".orbit-0");

    // tests
    await expect.element(orbit).toHaveStyle({ borderStyle: "dotted" });
  });
});

describe("Orbital: Orbit Spacing", () => {
  it("should apply the default orbit spacing if orbitSpacing is NOT specified", async () => {
    // options
    const options = {
      orbits: [{ items: ["https://placehold.co/50"] }, { items: ["https://placehold.co/50"] }],
    };

    // init
    orbital = new Orbital(container, options);

    // elements
    const orbits = container.querySelectorAll(".orbit");

    // tests

    await expect.element(orbits[0]).toHaveStyle({ width: "150px" });
    await expect.element(orbits[1]).toHaveStyle({ width: "260px" });
  });

  it("should apply custom orbit spacing when provided", async () => {
    // options
    const options = {
      orbitSpacing: 100,
      orbits: [{ items: ["https://placehold.co/50"] }, { items: ["https://placehold.co/50"] }],
    };

    // init
    orbital = new Orbital(container, options);

    // elements
    const orbits = container.querySelectorAll(".orbit");

    // tests
    await expect.element(orbits[0]).toHaveStyle({ width: "150px" });
    await expect.element(orbits[1]).toHaveStyle({ width: "350px" });
  });
});

describe("Orbital: Custom Radius", () => {
  it("should apply the default radius if customRadius is NOT specified", async () => {
    // options
    const options = {
      orbits: [{ items: ["https://placehold.co/50"] }, { items: ["https://placehold.co/50"] }],
    };

    // init
    orbital = new Orbital(container, options);

    // elements
    const orbits = container.querySelectorAll(".orbit");

    // tests
    await expect.element(orbits[0]).toHaveStyle({ width: "150px" });
    await expect.element(orbits[1]).toHaveStyle({ width: "260px" });
  });

  it("should apply customRadius when specified", async () => {
    // options
    const options = {
      orbits: [{ items: ["https://placehold.co/50"], customRadius: 120 }],
    };

    // init
    orbital = new Orbital(container, options);

    // elements
    const orbits = container.querySelectorAll(".orbit");

    // tests
    await expect.element(orbits[0]).toHaveStyle({ width: "240px" });
  });
});

describe("Orbital: Orbit Speed", () => {
  it("should apply the default animation duration if speed is NOT specified", async () => {
    // options
    const options = {
      orbits: [{ items: ["https://placehold.co/50"] }],
    };

    // init
    orbital = new Orbital(container, options);

    // elements
    const orbits = container.querySelectorAll(".orbit");

    // tests
    await expect.element(orbits[0]).toHaveStyle({ animationDuration: "10s" });
  });

  it("should apply custom speed when specified", async () => {
    const options = {
      orbits: [{ items: ["https://placehold.co/50"], speed: 30 }],
    };

    // init
    orbital = new Orbital(container, options);

    // elements
    const orbits = container.querySelectorAll(".orbit");

    // tests
    await expect.element(orbits[0]).toHaveStyle({ animationDuration: "30s" });
  });

  it("should stop animation when speed is set to <= 0", async () => {
    const options = {
      orbits: [{ items: ["https://placehold.co/50"], speed: -1 }],
    };

    // init
    orbital = new Orbital(container, options);

    // elements
    const orbits = container.querySelectorAll(".orbit");
    const items = container.querySelectorAll(".orbit-wrapper");

    // tests
    await expect.element(orbits[0]).toHaveStyle({ animation: "none" });
    await expect.element(items[0]).toHaveStyle({ animation: "none" });
  });
});
