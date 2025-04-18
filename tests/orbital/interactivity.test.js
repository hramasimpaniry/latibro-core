import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { page, userEvent } from "@vitest/browser/context";
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

describe("Orbital: Interactivity", () => {
  it.skip("should pause orbit on mouseenter", async () => {
    // options
    const options = {
      interactivity: true,
      orbits: [
        {
          items: ["https://placehold.co/50", "https://placehold.co/50", "https://placehold.co/50"],
          speed: 10,
        },
      ],
    };

    // init
    orbital = new Orbital(container, options);

    // elements
    const orbits = container.querySelectorAll(".orbit");
    const item = container.querySelector(".orbit .orbit-item");

    // interactivity
    await userEvent.hover(item, { force: true });

    // wait
    await new Promise((resolve) => setTimeout(resolve, 50));

    // tests
    await expect.element(orbits[0]).toHaveClass("orbit-paused");
  });

  it.skip("should run orbit on mouseleave", async () => {
    // options
    const options = {
      interactivity: true,
      orbits: [
        {
          items: ["https://placehold.co/50", "https://placehold.co/50", "https://placehold.co/50"],
          speed: 10,
        },
      ],
    };

    // init
    orbital = new Orbital(container, options);

    // elements
    const orbits = container.querySelectorAll(".orbit");
    const item = container.querySelector(".orbit .orbit-item");

    // interactivity
    await userEvent.unhover(item, { force: true });

    // wait
    await new Promise((resolve) => setTimeout(resolve, 50));

    // tests
    await expect.element(orbits[0]).not.toHaveClass("orbit-paused");
  });

  it("should open panel on item click", async () => {
    // options
    const options = {
      interactivity: true,
      orbits: [
        {
          items: [
            {
              src: "https://placehold.co/50",
              panel: {
                content: "Hello from Item 1",
              },
            },
            "https://placehold.co/50",
            "https://placehold.co/50",
          ],
          speed: 10,
        },
      ],
    };

    // init
    orbital = new Orbital(container, options);

    // elements
    const orbits = container.querySelectorAll(".orbit");
    const item = container.querySelector(".orbit .orbit-item");

    // interactivity
    await userEvent.click(item, { force: true });

    // wait
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // panel
    const panel = document.querySelector(".orbit-panel");

    // tests
    await expect.element(panel).not.toBeNull();
  });

  it("should make panel fit screen when panel.container is document.body", async () => {
    // options
    const options = {
      interactivity: true,
      panel: {
        container: document.body,
      },
      orbits: [
        {
          items: [
            {
              src: "https://placehold.co/50",
              panel: {
                content: "Hello from Item 1",
              },
            },
            "https://placehold.co/50",
            "https://placehold.co/50",
          ],
          speed: 10,
        },
      ],
    };

    // init
    orbital = new Orbital(container, options);

    // elements
    const orbits = container.querySelectorAll(".orbit");
    const item = container.querySelector(".orbit .orbit-item");

    // interactivity
    await userEvent.click(item, { force: true });

    // wait
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // panel
    const panel = document.querySelector(".orbit-panel");
    const panelRect = {
      width: window.innerWidth - orbital.options.panel.offset.width,
      height: window.innerHeight - orbital.options.panel.offset.height,
    };

    // tests
    await expect.element(panel).not.toBeNull();
    await expect.element(panel).toHaveStyle({ width: `${panelRect.width}px`, height: `${panelRect.height}px` });
  });
});
