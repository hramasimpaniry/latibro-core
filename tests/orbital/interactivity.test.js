import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { page, userEvent } from "@vitest/browser/context";
import Orbital from "../../src/Orbital";

let container;
let orbital;
const delay = 2000;

async function expectPanelStyle(item, style) {
  // interactivity
  await userEvent.click(item, { force: true });

  // wait
  await new Promise((resolve) => setTimeout(resolve, delay));

  // elements
  let panel = document.querySelector(".orbit-panel");
  const panelClose = document.querySelector(".orbit-panel-close");

  // tests
  await expect.element(panel).not.toBeNull();
  await expect.element(panel).toHaveStyle(style);

  // wait
  await new Promise((resolve) => setTimeout(resolve, delay));

  // -- close panel

  // interactivity
  await panelClose.click(item, { force: true });

  // wait
  await new Promise((resolve) => setTimeout(resolve, delay));

  // elements
  panel = document.querySelector(".orbit-panel");

  // tests
  await expect.element(panel).toBeNull();
}

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  orbital?.destroy();
  container?.remove();
});

describe("Orbital: Interactivity / Mouse", () => {
  it("should pause orbit on mouseenter", async () => {
    // options
    const options = {
      interactivity: {
        enabled: true,
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
      interactivity: {
        enabled: true,
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

  it("should display an overlay on item click", async () => {
    // options
    const options = {
      interactivity: {
        enabled: true,
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

    // overlay
    const overlay = document.querySelector("#orbit-panel-overlay");

    // tests
    await expect.element(overlay).not.toBeNull();
    await expect.element(overlay).toHaveStyle("z-index: 1002");
  });

  it("should display a panel on item click", async () => {
    // options
    const options = {
      interactivity: {
        enabled: true,
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
    await new Promise((resolve) => setTimeout(resolve, delay));

    // panel
    const panel = document.querySelector(".orbit-panel");

    // tests
    await expect.element(panel).not.toBeNull();
    await expect.element(panel).toHaveStyle("z-index: 1003");
  });

  it("should panel have a close button", async () => {
    // options
    const options = {
      interactivity: {
        enabled: true,
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
    const closeButton = document.querySelector(".orbit-panel-close");

    // tests
    await expect.element(closeButton).not.toBeNull();
  });

  it("should close button close the panel when clicked", async () => {
    // options
    const options = {
      interactivity: {
        enabled: true,
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
    const panelClose = document.querySelector(".orbit-panel-close");

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

describe("Orbital: Interactivity / Panel", () => {
  it("should apply default panel config if NOT provided", async () => {
    let items;
    let item;

    // options
    const options = {
      interactivity: {
        enabled: true,
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
            {
              src: "https://placehold.co/50",
              panel: {
                content: "Hello from Item 2",
              },
            },
            {
              src: "https://placehold.co/50",
              panel: {
                content: "Hello from Item 3",
              },
            },
          ],
          speed: 0,
        },
      ],
    };

    // init
    orbital = new Orbital(container, options);

    // values
    const panelStyle = {
      top: `${document.documentElement.clientHeight / 2}px`,
      left: `${document.documentElement.clientWidth / 2}px`,
      width: `${document.documentElement.clientWidth - 30}px`,
      height: `${document.documentElement.clientHeight - 30}px`,
    };

    // -- item 0
    // elements
    items = container.querySelectorAll(".orbit .orbit-item");
    item = items[0];

    // tests
    expectPanelStyle(item, panelStyle);

    // -- item 1
    // elements
    items = container.querySelectorAll(".orbit .orbit-item");
    item = items[1];

    // tests
    expectPanelStyle(item, panelStyle);

    // -- item 2
    // elements
    items = container.querySelectorAll(".orbit .orbit-item");
    item = items[2];

    // tests
    expectPanelStyle(item, panelStyle);
  });

  it("should apply global panel config if provided", async () => {
    let items;
    let item;

    // options
    const options = {
      interactivity: {
        enabled: true,
      },
      panel: {
        style: {
          left: 200,
          top: 200,
          width: 600,
          height: 400,
        },
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
            {
              src: "https://placehold.co/50",
              panel: {
                content: "Hello from Item 2",
              },
            },
            {
              src: "https://placehold.co/50",
              panel: {
                content: "Hello from Item 3",
              },
            },
          ],
          speed: 0,
        },
      ],
    };

    // init
    orbital = new Orbital(container, options);

    // -- item 0
    // elements
    items = container.querySelectorAll(".orbit .orbit-item");
    item = items[0];

    // tests
    expectPanelStyle(item, options.panel.style);

    // -- item 1
    // elements
    items = container.querySelectorAll(".orbit .orbit-item");
    item = items[1];

    // tests
    expectPanelStyle(item, options.panel.style);

    // -- item 2
    // elements
    items = container.querySelectorAll(".orbit .orbit-item");
    item = items[2];

    // tests
    expectPanelStyle(item, options.panel.style);
  });

  it("should apply custom panel if provided", async () => {
    let items;
    let item;

    // options
    const options = {
      interactivity: {
        enabled: true,
      },
      panel: {
        style: {
          left: 200,
          top: 200,
          width: 600,
          height: 400,
        },
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
            {
              src: "https://placehold.co/50",
              panel: {
                content: "Hello from Item 2",
                style: {
                  left: 0,
                  top: 0,
                  width: 500,
                  height: 300,
                },
              },
            },
            {
              src: "https://placehold.co/50",
              panel: {
                content: "Hello from Item 3",
                style: {
                  left: 150,
                  top: 150,
                  width: 200,
                  height: 200,
                },
              },
            },
          ],
          speed: 0,
        },
      ],
    };

    // init
    orbital = new Orbital(container, options);

    // -- item 0
    // elements
    items = container.querySelectorAll(".orbit .orbit-item");
    item = items[0];

    // tests
    expectPanelStyle(item, options.panel.style);

    // -- item 1
    // elements
    items = container.querySelectorAll(".orbit .orbit-item");
    item = items[1];

    // tests
    expectPanelStyle(item, options.orbits[0].items[1].panel.style);

    // -- item 2
    // elements
    items = container.querySelectorAll(".orbit .orbit-item");
    item = items[2];

    // tests
    expectPanelStyle(item, options.orbits[0].items[2].panel.style);
  });
});
