import { describe, it, expect } from "vitest";
import Orbital from "../../src/Orbital";

describe("Orbital: Items", () => {
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
    const items = container.querySelectorAll(".orbit-item");
    const item0 = items[0];
    const computedStyle0 = window.getComputedStyle(item0);
    const width = "48px"; // default
    const height = "48px"; // default

    // tests
    expect(items.length).toBe(3);
    expect(item0.classList).toContain("orbit-item-0-0");
    expect(computedStyle0.width).toEqual(width);
    expect(computedStyle0.height).toEqual(height);
  });

  it("should apply custom CSS", async () => {
    const container = document.createElement("div");
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
      .custom-item {
        width: 75px;
      }
    `;

    document.body.appendChild(container);
    document.head.appendChild(styleTag);

    const options = {
      orbits: [
        {
          items: [
            {
              src: "https://placehold.co/50",
              customCss: "custom-item",
            },
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
    const items = container.querySelectorAll(".orbit-item");
    const item0 = items[0];
    const computedStyle0 = window.getComputedStyle(item0);
    const width = "48px"; // default
    const height = "48px"; // default

    // tests
    expect(items.length).toBe(3);
    expect(item0.classList).toContain("custom-item");
    expect(computedStyle0.width).toEqual(width);
    expect(computedStyle0.height).toEqual(height);
  });

  it("should apply custom styles", async () => {
    const container = document.createElement("div");
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
      .custom-item {
        width: 75px;
      }
    `;

    document.body.appendChild(container);
    document.head.appendChild(styleTag);

    const options = {
      orbits: [
        {
          items: [
            {
              src: "https://placehold.co/50",
              customCss: "custom-item",
              styles: {
                width: "150px",
              },
            },
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
    const items = container.querySelectorAll(".orbit-item");
    const item0 = items[0];
    const computedStyle0 = window.getComputedStyle(item0);
    const width = options.orbits[0].items[0].styles.width; // default
    const height = "48px"; // default

    // tests
    expect(items.length).toBe(3);
    expect(item0.classList).toContain("custom-item");
    expect(computedStyle0.width).toEqual(width);
    expect(computedStyle0.height).toEqual(height);
  });
});
