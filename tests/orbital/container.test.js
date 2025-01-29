import { describe, it, expect } from "vitest";
import Orbital from "../../src/Orbital";

describe("Orbital: Container", () => {
  it("should apply custom orbitSpacing over customRadius", () => {
    const container = document.createElement("div");
    const options = {
      orbitSpacing: 100,
      orbits: [
        {
          items: ["https://placehold.co/50"],
          customRadius: 80,
        },
      ],
    };

    new Orbital(container, options);
    const orbit = container.querySelector(".orbit-0 > div");
    const orbitIndex = 0;
    const orbitRadius =
      (options.orbits[orbitIndex].customRadius || 75) +
      orbitIndex * options.orbitSpacing;
    expect(window.getComputedStyle(orbit).offsetPath).toBe(
      `circle(${orbitRadius}px at 50% 50%)`
    );
  });

  it("should apply default CSS", () => {
    const container = document.createElement("div");
    const options = { orbits: [] };
    new Orbital(container, options);

    expect(container.classList.contains("orbital-container")).toBe(true);
  });

  it("should apply custom CSS prior to default CSS", () => {
    const container = document.createElement("div");
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
      .custom-container {
        background-color: blue;
        border: 3px dashed green;
      }
    `;
    document.head.appendChild(styleTag);

    const options = {
      orbits: [],
      container: {
        customCss: "custom-container",
      },
    };

    new Orbital(container, options);

    expect(container.classList.contains("orbital-container")).toBe(true);
    expect(container.classList.contains("custom-container")).toBe(true);

    expect(window.getComputedStyle(container).backgroundColor).toBe(
      "rgb(0, 0, 255)"
    );
    expect(window.getComputedStyle(container).border).toBe("3px dashed green");
  });

  it("should apply custom styles prior to custom CSS", () => {
    const container = document.createElement("div");
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
      .custom-container {
        background-color: blue;
        border: 3px dashed green;
      }
    `;
    document.head.appendChild(styleTag);

    const options = {
      orbits: [],
      container: {
        styles: {
          backgroundColor: "#ff5733",
          border: "2px solid #000",
        },
        customCss: "custom-container",
      },
    };

    new Orbital(container, options);

    expect(container.classList.contains("orbital-container")).toBe(true);
    expect(container.classList.contains("custom-container")).toBe(true);

    expect(window.getComputedStyle(container).backgroundColor).toBe(
      "rgb(255, 87, 51)" // #ff5733
    );
    expect(window.getComputedStyle(container).border).toBe("2px solid #000");
  });
});
