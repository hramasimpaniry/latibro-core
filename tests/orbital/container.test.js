import { describe, it, expect } from "vitest";
import Orbital from "../../src/Orbital";

describe("Orbital: Container", () => {
  it("should apply default CSS", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

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

    new Orbital(container, options);

    expect(container.classList.contains("orbital-container")).toBe(true);
    expect(container.classList.contains("custom-container")).toBe(true);

    expect(window.getComputedStyle(container).backgroundColor).toBe(
      "rgb(255, 87, 51)" // #ff5733
    );
    expect(window.getComputedStyle(container).border).toBe("2px solid #000");
  });
});
