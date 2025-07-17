import { describe, it, expect, beforeEach, afterEach } from "vitest";
import Orbital from "../../src/Orbital";

describe("Orbital: Container", () => {
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

  it("should apply default CSS", async () => {
    const options = { orbits: [] };

    // init
    orbital = new Orbital(container, options);

    // tests
    await expect.element(container).toHaveClass("orbital-container");
    await expect.element(container).toHaveStyle("background-color: #1a202c;");
  });

  it("should apply custom CSS prior to default CSS", async () => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
      .custom-container {
        border: 3px dashed green;
      }
    `;
    document.head.appendChild(styleTag);

    const options = {
      orbits: [],
      container: {
        customCss: "custom-container", // custom CSS
      },
    };

    // init
    orbital = new Orbital(container, options);

    // tests
    await expect.element(container).toHaveClass("orbital-container");
    await expect.element(container).toHaveStyle("border: 3px dashed green");
  });

  it("should apply custom styles prior to custom CSS", async () => {
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
        // custom styles
        style: {
          backgroundColor: "#ff5733",
          border: "2px solid #000",
        },
        customCss: "custom-container", // custom CSS
      },
    };

    // init
    orbital = new Orbital(container, options);

    // tests
    await expect.element(container).toHaveClass("orbital-container custom-container");
    await expect.element(container).toHaveStyle({
      backgroundColor: "#ff5733",
      border: "2px solid #000",
    });
  });
});
