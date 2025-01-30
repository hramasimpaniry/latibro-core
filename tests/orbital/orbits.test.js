import { describe, it, expect } from "vitest";
import Orbital from "../../src/Orbital";

describe("Orbital: Orbits", () => {
  it("should apply default CSS", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const options = {
      orbits: [
        {
          items: [
            "https://placehold.co/50",
            "https://placehold.co/50",
            "https://placehold.co/50",
          ],
        },
      ],
    };

    new Orbital(container, options);

    const orbit = container.querySelector(".orbit");
    expect(orbit.className).toBe("orbit orbit-0");
  });

  it("should apply custom CSS", () => {
    const container = document.createElement("div");
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
      .custom-orbit {
        border: solid 1px red;
      }
    `;
    document.body.appendChild(container);
    document.head.appendChild(styleTag);

    const options = {
      orbits: [
        {
          items: [
            "https://placehold.co/50",
            "https://placehold.co/50",
            "https://placehold.co/50",
          ],
          customCss: "custom-orbit",
        },
      ],
    };

    new Orbital(container, options);

    const orbit = container.querySelector(".orbit-0");
    expect(window.getComputedStyle(orbit).border).toBe("1px solid red");
  });

  it("should apply custom styles", () => {
    const container = document.createElement("div");
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
      .custom-orbit {
        border-style: solid;
      }
    `;
    document.body.appendChild(container);
    document.head.appendChild(styleTag);

    const options = {
      orbits: [
        {
          items: [
            "https://placehold.co/50",
            "https://placehold.co/50",
            "https://placehold.co/50",
          ],
          customCss: "custom-orbit",
          styles: {
            borderStyle: "dotted",
          },
        },
      ],
    };

    new Orbital(container, options);

    const orbit = container.querySelector(".orbit-0");
    expect(window.getComputedStyle(orbit).borderStyle).toBe("dotted");
  });
});

describe("Orbital: Orbit Spacing", () => {
  it("should apply the default orbit spacing if not specified", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const options = {
      orbits: [
        { items: ["https://placehold.co/50"] },
        { items: ["https://placehold.co/50"] },
      ],
    };

    new Orbital(container, options);

    const orbits = container.querySelectorAll(".orbit");

    expect(orbits.length).toBe(2);

    const firstOrbitSize = parseFloat(window.getComputedStyle(orbits[0]).width);
    const secondOrbitSize = parseFloat(
      window.getComputedStyle(orbits[1]).width
    );

    expect(secondOrbitSize).toBe(firstOrbitSize + 2 * 55);
  });

  it("should apply custom orbit spacing when provided", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const options = {
      orbitSpacing: 100,
      orbits: [
        { items: ["https://placehold.co/50"] },
        { items: ["https://placehold.co/50"] },
      ],
    };

    new Orbital(container, options);

    const orbits = container.querySelectorAll(".orbit");

    expect(orbits.length).toBe(2);

    const firstOrbitSize = parseFloat(window.getComputedStyle(orbits[0]).width);
    const secondOrbitSize = parseFloat(
      window.getComputedStyle(orbits[1]).width
    );

    expect(secondOrbitSize).toBe(firstOrbitSize + 2 * 100);
  });
});

describe("Orbital: Custom Radius", () => {
  it("should apply the default radius if customRadius is not specified", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const options = {
      orbits: [{ items: ["https://placehold.co/50"] }],
    };

    new Orbital(container, options);

    const orbit = container.querySelector(".orbit");

    setTimeout(() => {
      // Expected: 75px * 2
      expect(parseFloat(window.getComputedStyle(orbit).width)).toBe(150);
      expect(parseFloat(window.getComputedStyle(orbit).height)).toBe(150);
    }, 400);
  });

  it("should apply customRadius when specified", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const options = {
      orbits: [{ items: ["https://placehold.co/50"], customRadius: 120 }],
    };

    new Orbital(container, options);

    const orbit = container.querySelector(".orbit");

    setTimeout(() => {
      // Expected: 120px * 2
      expect(parseFloat(window.getComputedStyle(orbit).width)).toBe(240);
      expect(parseFloat(window.getComputedStyle(orbit).height)).toBe(240);
    }, 400);
  });
});
