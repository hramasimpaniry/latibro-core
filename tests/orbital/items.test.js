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
    const items = container.querySelectorAll(".orbit .orbit-item-container");

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
    const items = container.querySelectorAll(".orbit .orbit-item-container");

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
    const items = container.querySelectorAll(".orbit .orbit-item-container");

    await expect.element(items[0]).toHaveClass("custom-item");
    await expect.element(items[0]).toHaveStyle({ width: "150px", height: "48px" });
    await expect.element(items[1]).toHaveStyle({ width: "48px", height: "48px" });
    await expect.element(items[2]).toHaveStyle({ width: "48px", height: "48px" });
  });

  it("should display an image if item string is provided", async () => {
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
    let item;
    let content;
    item = container.querySelector(".orbit-item-container-0-0");
    content = container.querySelector(".orbit-item-img-0-0");

    // tests
    await expect.element(content).toBeInstanceOf(Image);
    await expect.element(content).toHaveAttribute("src", "https://placehold.co/50");
    await expect.element(item).toContainElement(content);
  });

  it("should display an image if item.src provided", async () => {
    // options
    const options = {
      orbits: [
        {
          items: [
            {
              src: "https://placehold.co/50",
              alt: "Item Image",
            },
            "https://placehold.co/50",
            "https://placehold.co/50",
          ],
        },
      ],
    };

    // init
    orbital = new Orbital(container, options);

    // elements
    let item;
    let content;
    item = container.querySelector(".orbit-item-container-0-0");
    content = container.querySelector(".orbit-item-img-0-0");

    // tests
    await expect.element(content).toBeInstanceOf(Image);
    await expect.element(content).toHaveAttribute("src", "https://placehold.co/50");
    await expect.element(content).toHaveStyle({ width: "32px", height: "32px" });
    await expect.element(item).toContainElement(content);
  });

  it("should display html if item.content.html is provided", async () => {
    const thumbnailContent = `
    <div>
    <span>Line 1</span>
    <span>Line 2</span>
    <span>Line 3</span>
    </div>`;
    // options
    const options = {
      orbits: [
        {
          items: [
            {
              src: "https://placehold.co/50",
              alt: "Item Content",
              content: {
                html: thumbnailContent,
              },
            },
            "https://placehold.co/50",
            "https://placehold.co/50",
          ],
        },
      ],
    };

    // init
    orbital = new Orbital(container, options);

    // elements
    let item;
    let content;
    item = container.querySelector(".orbit-item-container-0-0");
    content = container.querySelector(".orbit-item-content-0-0");

    // tests
    await expect.element(content).toBeInstanceOf(HTMLElement);
    await expect.element(content).toHaveTextContent("Line 1");
    await expect.element(content).toHaveTextContent("Line 2");
    await expect.element(content).toHaveTextContent("Line 3");
    await expect.element(item).toContainElement(content);
  });

  it("should apply customCss if item.content.customCss is provided", async () => {
    const thumbnailContent = `
    <div>
    <span>Line 1</span>
    <span>Line 2</span>
    <span>Line 3</span>
    </div>`;
    // options
    const options = {
      orbits: [
        {
          items: [
            {
              src: "https://placehold.co/50",
              alt: "Item Content",
              content: {
                html: thumbnailContent,
                customCss: "custom-item",
              },
            },
            "https://placehold.co/50",
            "https://placehold.co/50",
          ],
        },
      ],
    };

    // init
    orbital = new Orbital(container, options);

    // elements
    let item;
    let content;
    item = container.querySelector(".orbit-item-container-0-0");
    content = container.querySelector(".orbit-item-content-0-0");

    // tests
    await expect.element(content).toBeInstanceOf(HTMLElement);
    await expect.element(content).toHaveClass("custom-item");
    await expect.element(item).toContainElement(content);
  });

  it("should apply custom style if item.content.style is provided", async () => {
    const thumbnailContent = `
    <div>
    <span>Line 1</span>
    <span>Line 2</span>
    <span>Line 3</span>
    </div>`;
    // options
    const options = {
      orbits: [
        {
          items: [
            {
              src: "https://placehold.co/50",
              alt: "Item Content",
              content: {
                html: thumbnailContent,
                customCss: "custom-item",
                style: {
                  backgroundColor: "red",
                },
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
         background-color: blue
      }
    `;
    document.head.appendChild(styleTag);

    // init
    orbital = new Orbital(container, options);

    // elements
    let item;
    let content;
    item = container.querySelector(".orbit-item-container-0-0");
    content = container.querySelector(".orbit-item-content-0-0");

    // tests
    await expect.element(content).toBeInstanceOf(HTMLElement);
    await expect.element(content).toHaveClass("custom-item");
    await expect.element(content).toHaveStyle("background-color: red");
    await expect.element(item).toContainElement(content);
  });
});
