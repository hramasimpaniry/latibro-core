import { describe, it, expect } from "vitest";
import Orbital from "../../src/Orbital";

describe("Orbital: Container", () => {
  it("should apply default CSS", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const options = { orbits: [] };

    // init
    new Orbital(container, options);

    // reflow
    container.offsetHeight;
    await new Promise((resolve) => requestAnimationFrame(resolve));

    // elements
    const computedStyle = window.getComputedStyle(container);

    // tests
    expect(container.classList).toContain("orbital-container");
    expect(computedStyle.backgroundColor).toEqual("rgb(26, 32, 44)"); // #1a202c
  });

  it("should apply custom CSS prior to default CSS", async () => {
    const container = document.createElement("div");
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
      .custom-container {
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

    // init
    new Orbital(container, options);

    // reflow
    container.offsetHeight;
    await new Promise((resolve) => requestAnimationFrame(resolve));

    // elements
    const computedStyle = window.getComputedStyle(container);

    // tests
    expect(container.classList).toContain("custom-container");
    expect(computedStyle.border).toEqual("3px dashed green");
  });

  it("should apply custom styles prior to custom CSS", async () => {
    const container = document.createElement("div");
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
      .custom-container {
        background-color: blue;
        border: 3px dashed green;
      }
    `;
    document.body.appendChild(container);
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

    // init
    new Orbital(container, options);

    // reflow
    container.offsetHeight;
    await new Promise((resolve) => requestAnimationFrame(resolve));

    // elements
    const computedStyle = window.getComputedStyle(container);

    // tests
    expect(container.classList).toContain("custom-container");
    expect(computedStyle.border).toEqual("2px solid #000");
  });
});
