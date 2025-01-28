import { describe, it, expect } from "vitest";
import Orbital from "../../src/Orbital";

describe("Orbital: Items", () => {
  it("should create items with the correct border radius", () => {
    const container = document.createElement("div");
    const options = {
      orbits: [
        {
          items: ["https://placehold.co/50", "https://placehold.co/50"],
        },
      ],
    };

    new Orbital(container, options);

    const items = container.querySelectorAll("div > div > div > div");
    expect(items.length).toBe(2);
    expect(items[0].style.borderRadius).toContain("50%");
  });
});
