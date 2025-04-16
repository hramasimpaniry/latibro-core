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
  it("should pause orbit on mouseenter", async () => {
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

    // tests
    await expect.element(orbits[0]).toHaveClass("orbit-paused");
  });

  it("should run orbit on mouseleave", async () => {
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

    // tests
    await expect.element(orbits[0]).not.toHaveClass("orbit-paused");
  });
});
