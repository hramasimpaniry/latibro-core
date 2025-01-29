import { describe, it, expect } from "vitest";
import Orbital from "../../src/Orbital";

describe("Orbital: Container", () => {
  it("should apply default container inline styles if no customCss is provided", () => {
    const container = document.createElement("div");
    const options = { orbits: [] };
    new Orbital(container, options);

    expect(container.style.position).toBe("relative");
    expect(container.style.overflow).toBe("hidden");
    expect(container.style.display).toBe("flex");
    expect(container.style.backgroundColor).toBe("rgb(26, 32, 44)");
  });

  it("should apply custom inline styles if no customCss is provided", () => {
    const container = document.createElement("div");
    const options = {
      orbits: [],
      container: {
        styles: {
          backgroundColor: "#ff5733",
          border: "2px solid #000",
          padding: "10px",
        },
      },
    };

    new Orbital(container, options);

    expect(container.style.backgroundColor).toBe("rgb(255, 87, 51)");
    expect(container.style.border).toBe("2px solid #000");
    expect(container.style.padding).toBe("10px");
  });

  it("should NOT apply inline styles if customCss is provided", () => {
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

    expect(container.classList.contains("custom-container")).toBe(true);

    expect(container.style.backgroundColor).toBe("");
    expect(container.style.border).toBe("");

    expect(window.getComputedStyle(container).backgroundColor).toBe(
      "rgb(0, 0, 255)"
    );
    expect(window.getComputedStyle(container).border).toBe("3px dashed green");
  });
});
