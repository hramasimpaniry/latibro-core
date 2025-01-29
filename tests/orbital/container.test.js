import { describe, it, expect } from "vitest";
import Orbital from "../../src/Orbital";

describe("Orbital: Container Customization", () => {
  it("should apply default container styles", () => {
    const container = document.createElement("div");
    const options = { orbits: [] };
    new Orbital(container, options);

    expect(container.style.position).toBe("relative");
    expect(container.style.overflow).toBe("hidden");
    expect(container.style.display).toBe("flex");
    expect(container.style.backgroundColor).toBe("rgb(26, 32, 44)");
  });

  it("should apply custom styles to the container", () => {
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
});
