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

describe("Orbital: Items", () => {
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
    const items = container.querySelectorAll(".orbit .orbit-item");

    await expect.element(items[0]).toHaveStyle({ width: "48px", height: "48px" });
    await expect.element(items[1]).toHaveStyle({ width: "48px", height: "48px" });
    await expect.element(items[2]).toHaveStyle({ width: "48px", height: "48px" });
  });

  it("should apply custom CSS", async () => {
    // options
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

    // styles
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
      .custom-item {
        width: 75px;
      }
    `;
    document.head.appendChild(styleTag);

    // init
    orbital = new Orbital(container, options);

    // elements
    const items = container.querySelectorAll(".orbit .orbit-item");

    await expect.element(items[0]).toHaveClass("custom-item");
    await expect.element(items[0]).toHaveStyle({ width: "75px", height: "48px" });
    await expect.element(items[1]).toHaveStyle({ width: "48px", height: "48px" });
    await expect.element(items[2]).toHaveStyle({ width: "48px", height: "48px" });
  });

  it("should apply custom styles", async () => {
    // options
    const options = {
      orbits: [
        {
          items: [
            {
              src: "https://placehold.co/50",
              customCss: "custom-item",
              style: {
                width: "150px",
              },
            },
            "https://placehold.co/50",
            "https://placehold.co/50",
          ],
        },
      ],
    };

    // styles
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
      .custom-item {
        width: 75px;
      }
    `;
    document.head.appendChild(styleTag);

    // init
    orbital = new Orbital(container, options);

    // elements
    const items = container.querySelectorAll(".orbit .orbit-item");

    await expect.element(items[0]).toHaveClass("custom-item");
    await expect.element(items[0]).toHaveStyle({ width: "150px", height: "48px" });
    await expect.element(items[1]).toHaveStyle({ width: "48px", height: "48px" });
    await expect.element(items[2]).toHaveStyle({ width: "48px", height: "48px" });
  });
});
