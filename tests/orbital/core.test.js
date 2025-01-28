import { describe, it, expect } from "vitest";
import Orbital from "../../src/Orbital";

describe("Orbital: Orbits", () => {
  it("should create orbits with default parameters", () => {
    const container = document.createElement("div");
    const options = {
      orbits: [{ items: ["https://placehold.co/50"], speed: 10 }],
    };

    new Orbital(container, options);

    const orbit = container.querySelector("div > div");
    expect(orbit).not.toBeNull();
    expect(orbit.style.width).toBe("150px"); // Default radius 75 * 2
    expect(orbit.style.height).toBe("150px");
    expect(orbit.style.borderRadius).toBe("50%");
  });

  it("should apply custom radius and styles for orbits", () => {
    const container = document.createElement("div");
    const options = {
      orbits: [
        {
          items: ["https://placehold.co/50"],
          customRadius: 100,
          borderColor: "red",
          borderStyle: "solid",
          borderWidth: 4,
        },
      ],
    };

    new Orbital(container, options);

    const orbit = container.querySelector("div > div");
    expect(orbit.style.width).toBe("200px"); // Custom radius 100 * 2
    expect(orbit.style.border).toBe("4px solid red");
  });
});
