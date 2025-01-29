import { describe, it, expect } from "vitest";
import Orbital from "../../src/Orbital";

describe("Orbital: Orbits", () => {
  it("should create orbits with default CSS", () => {
    const container = document.createElement("div");
    const options = {
      orbits: [{ items: ["https://placehold.co/50"], speed: 10 }],
    };

    new Orbital(container, options);

    const orbit = container.querySelector("div > div");
    expect(orbit).not.toBeNull();
    orbit.classList.contains("orbit-0");
  });

  it("should apply custom radius and styles for orbits", () => {
    const container = document.createElement("div");
    const options = {
      orbits: [
        {
          items: ["https://placehold.co/50"],
          customRadius: 100,
          styles: {
            borderStyle: "solid",
            borderWidth: "4px",
            borderColor: "red",
          },
        },
      ],
    };

    new Orbital(container, options);

    const orbit = container.querySelector("div > div");
    expect(orbit.style.border).toBe("4px solid red");
  });

  it("should apply custom CSS prior to default CSS", () => {
    const container = document.createElement("div");
    const options = {
      orbits: [
        {
          items: ["https://placehold.co/50"],
          customCss: "orbit-custom",
        },
      ],
    };

    new Orbital(container, options);

    const orbit = container.querySelector("div > div");
    orbit.classList.contains("orbit-0 orbit-custom");
  });

  it("should apply custom styles prior to custom CSS", () => {
    const container = document.createElement("div");
    const options = {
      orbits: [
        {
          items: ["https://placehold.co/50"],
          customCss: "orbit-custom",
          styles: {
            border: "3px solid red",
            width: "200px",
            height: "200px",
          },
        },
      ],
    };

    new Orbital(container, options);

    const orbit = container.querySelector("div > div");
    orbit.classList.contains("orbit-custom");
    expect(orbit.style.border).toBe("3px solid red");
    expect(orbit.style.width).toBe("200px");
    expect(orbit.style.height).toBe("200px");
  });
});
