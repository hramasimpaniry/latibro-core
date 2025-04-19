import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { page, userEvent } from "@vitest/browser/context";
import Orbital from "../../src/Orbital";

let container;
let orbital;
const delay = 2000;

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
          speed: 0,
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
    await new Promise((resolve) => setTimeout(resolve, delay));

    // tests
    await expect.element(orbits[0]).toHaveClass("orbit-paused");
  });

  it("should run orbit on mouseleave", async () => {
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
          speed: 0,
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

    // wait
    await new Promise((resolve) => setTimeout(resolve, delay));

    // interactivity
    await userEvent.unhover(item, { force: true });

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
    await new Promise((resolve) => setTimeout(resolve, delay));

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
    const item = container.querySelector(".orbit .orbit-item");

    // interactivity
    await userEvent.click(item, { force: true });

    // wait
    await new Promise((resolve) => setTimeout(resolve, delay));

    // panel
    const panel = document.querySelector(".orbit-panel");
    const panelRect = {
      width: document.documentElement.clientWidth - orbital.options.panel.offset.width,
      height: document.documentElement.clientHeight - orbital.options.panel.offset.height,
    };

    // tests
    await expect.element(panel).not.toBeNull();
    await expect.element(panel).toHaveStyle({ width: `${panelRect.width}px`, height: `${panelRect.height}px` });
  });

  it("should close the panel when close button is clicked", async () => {
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
    const item = container.querySelector(".orbit .orbit-item");

    // interactivity
    await userEvent.click(item, { force: true });

    // wait
    await new Promise((resolve) => setTimeout(resolve, delay));

    // panel
    let panel = document.querySelector(".orbit-panel");
    const panelClose = panel.querySelector(".orbit-panel-close");

    // tests
    await expect.element(panelClose).not.toBeNull();

    // interactivity
    await panelClose.click(item, { force: true });

    // wait
    await new Promise((resolve) => setTimeout(resolve, delay));

    panel = document.querySelector(".orbit-panel");

    // tests
    await expect.element(panel).toBeNull();
  });
});
