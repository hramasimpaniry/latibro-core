import { describe, it, expect } from "vitest";
import Orbital from "../../src/Orbital";
import "@testing-library/jest-dom/vitest";

describe("Orbital: Orbits", () => {
  it("should apply default CSS", async () => {
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

    // init
    new Orbital(container, options);

    // reflow
    container.offsetHeight;
    await new Promise((resolve) => requestAnimationFrame(resolve));

    // elements
    const orbit = container.querySelector(".orbit-0");
    const computedStyle = window.getComputedStyle(orbit);

    // tests
    expect(computedStyle.border).toEqual("2px dashed white");
  });

  it("should apply custom CSS", async () => {
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

    // init
    new Orbital(container, options);

    // reflow
    container.offsetHeight;
    await new Promise((resolve) => requestAnimationFrame(resolve));

    // elements
    const orbit = container.querySelector(".orbit-0");
    const computedStyle = window.getComputedStyle(orbit);

    // tests
    expect(computedStyle.border).toEqual("2px dashed white");
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
  it("should apply the default orbit spacing if orbitSpacing is NOT specified", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const options = {
      orbits: [
        { items: ["https://placehold.co/50"] },
        { items: ["https://placehold.co/50"] },
      ],
    };

    // init
    new Orbital(container, options);

    // reflow
    container.offsetHeight;
    await new Promise((resolve) => requestAnimationFrame(resolve));

    // elements
    const orbits = container.querySelectorAll(".orbit");
    const computedStyle0 = window.getComputedStyle(orbits[0]);
    const computedStyle1 = window.getComputedStyle(orbits[1]);

    // tests
    const width0 = parseFloat(computedStyle0.width);
    const width1 = parseFloat(computedStyle1.width);
    const orbitSpacing = 55; // default
    const customRadius = 75; // default

    expect(orbits.length).toBe(2);

    // `width: ${2 * (orbit.customRadius || 75) + (orbitIndex * this.orbitSpacing) }px`
    expect(width0).toBe(2 * (customRadius + 0 * orbitSpacing));
    expect(width1).toBe(2 * (customRadius + 1 * orbitSpacing));
  });

  it("should apply custom orbit spacing when provided", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const options = {
      orbitSpacing: 100,
      orbits: [
        { items: ["https://placehold.co/50"] },
        { items: ["https://placehold.co/50"] },
      ],
    };

    // init
    new Orbital(container, options);

    // reflow
    container.offsetHeight;
    await new Promise((resolve) => requestAnimationFrame(resolve));

    // elements
    const orbits = container.querySelectorAll(".orbit");
    const computedStyle0 = window.getComputedStyle(orbits[0]);
    const computedStyle1 = window.getComputedStyle(orbits[1]);

    // tests
    const width0 = parseFloat(computedStyle0.width);
    const width1 = parseFloat(computedStyle1.width);
    const customRadius = 75; // default

    expect(orbits.length).toBe(2);

    // `width: ${2 * (orbit.customRadius || 75) + (orbitIndex * this.orbitSpacing) }px`
    expect(width0).toBe(2 * (customRadius + 0 * options.orbitSpacing));
    expect(width1).toBe(2 * (customRadius + 1 * options.orbitSpacing));
  });
});

describe("Orbital: Custom Radius", () => {
  it("should apply the default radius if customRadius is NOT specified", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const options = {
      orbits: [
        { items: ["https://placehold.co/50"] },
        { items: ["https://placehold.co/50"] },
      ],
    };

    // init
    new Orbital(container, options);

    // reflow
    container.offsetHeight;
    await new Promise((resolve) => requestAnimationFrame(resolve));

    // elements
    const orbits = container.querySelectorAll(".orbit");
    const computedStyle0 = window.getComputedStyle(orbits[0]);
    const computedStyle1 = window.getComputedStyle(orbits[1]);

    // tests
    const width0 = parseFloat(computedStyle0.width);
    const width1 = parseFloat(computedStyle1.width);
    const orbitSpacing = 55; // default
    const customRadius = 75; // default

    expect(orbits.length).toBe(2);

    // `width: ${2 * (orbit.customRadius || 75) + (orbitIndex * this.orbitSpacing) }px`
    expect(width0).toBe(2 * (customRadius + 0 * orbitSpacing));
    expect(width1).toBe(2 * (customRadius + 1 * orbitSpacing));
  });

  it("should apply customRadius when specified", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const options = {
      orbits: [{ items: ["https://placehold.co/50"], customRadius: 120 }],
    };

    // init
    new Orbital(container, options);

    // reflow
    container.offsetHeight;
    await new Promise((resolve) => requestAnimationFrame(resolve));

    // elements
    const orbits = container.querySelectorAll(".orbit");
    const computedStyle0 = window.getComputedStyle(orbits[0]);

    // tests
    const width0 = parseFloat(computedStyle0.width);
    const orbitSpacing = 55; // default
    const customRadius = options.orbits[0].customRadius;

    expect(orbits.length).toBe(1);

    // `width: ${2 * (orbit.customRadius || 75) + (orbitIndex * this.orbitSpacing) }px`
    expect(width0).toBe(2 * (customRadius + 0 * orbitSpacing));
  });
});

describe("Orbital: Orbit Speed", () => {
  it("should apply the default animation duration if speed is not specified", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const options = {
      orbits: [{ items: ["https://placehold.co/50"] }],
    };

    // init
    new Orbital(container, options);

    // reflow
    container.offsetHeight;
    await new Promise((resolve) => requestAnimationFrame(resolve));

    // elements
    const orbits = container.querySelectorAll(".orbit-wrapper");
    const computedStyle0 = window.getComputedStyle(orbits[0]);

    // tests
    const animation0 = computedStyle0.animation;
    const speed = 10; // default

    expect(orbits.length).toBe(1);

    // `orbit-wrapper-0-0-anim 10s linear infinite normal`
    expect(animation0).toContain(
      `orbit-wrapper-0-0-anim ${speed}s linear infinite normal`
    );
  });

  it("should apply custom speed when specified", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const options = {
      orbits: [{ items: ["https://placehold.co/50"], speed: 30 }],
    };

    // init
    new Orbital(container, options);

    // reflow
    container.offsetHeight;
    await new Promise((resolve) => requestAnimationFrame(resolve));

    // elements
    const orbits = container.querySelectorAll(".orbit-wrapper");
    const computedStyle0 = window.getComputedStyle(orbits[0]);

    // tests
    const animation0 = computedStyle0.animation;
    const speed = options.orbits[0].speed;

    expect(orbits.length).toBe(1);

    // `orbit-wrapper-0-0-anim 10s linear infinite normal`
    expect(animation0).toContain(
      `orbit-wrapper-0-0-anim ${speed}s linear infinite normal`
    );
  });
});
