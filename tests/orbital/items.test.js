import { describe, it, expect } from "vitest";
import Orbital from "../../src/Orbital";

describe("Orbital: Items", () => {
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

    const items = container.querySelectorAll(".orbit-item");
    expect(items.length).toBe(3);
    expect(items[0].className).toBe("orbit-item orbit-item-0-0");
  });

  it("should apply custom CSS", () => {
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

    new Orbital(container, options);

    const orbit = container.querySelector(".orbit-item-0-0");
    expect(window.getComputedStyle(orbit).width).toBe("75px");
  });

  it("should apply custom styles", () => {
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

    new Orbital(container, options);

    const item = container.querySelector(".orbit-item-0-0");
    expect(window.getComputedStyle(item).width).toBe("150px");
  });
});
