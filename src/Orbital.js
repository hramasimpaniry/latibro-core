class Orbital {
  constructor(container, options) {
    this.container = container;
    this.options = options || {};
    this.orbits = this.options.orbits || [];
    this.orbitSpacing = this.options.orbitSpacing || 55;
    this.backgroundColor = this.options?.styles?.backgroundColor || "#1a202c";
    this.init();
  }

  init() {
    const containerCssRuleName = `orbital-container`;

    this.addCSSRule(`.${containerCssRuleName} {
        width: 500px;
        height: 500px;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${this.backgroundColor};}
      `);
    // default CSS
    this.container.classList.add(containerCssRuleName);

    if (this.options?.container?.customCss) {
      // custom CSS
      this.container.classList.add(
        ...this.options.container.customCss.split(" ")
      );
    }

    if (this.options?.container?.styles) {
      // custom inline styles
      Object.assign(this.container.style, this.options.container.styles || {});
    }

    this.createOrbits();
  }

  createOrbits() {
    this.orbits.forEach((orbit, orbitIndex) => {
      const orbitRadius =
        (orbit.customRadius || 75) + orbitIndex * this.orbitSpacing;
      const orbitAnimationName = `orbit-${orbitIndex}-rotation`;
      const itemCount = orbit.items.length;
      const orbitDiv = document.createElement("div");
      const orbitCssRuleName = `orbit-${orbitIndex}`;

      // default CSS
      this.addCSSRule(`.${orbitCssRuleName} {
        position: absolute;
        width: ${2 * orbitRadius}px;
        height: ${2 * orbitRadius}px;
        border-radius: 50%;
        border: ${orbit?.styles?.borderWidth || 2}px ${
        orbit?.styles?.borderStyle || "dashed"
      } ${orbit?.styles?.borderColor || "white"};
        animation: ${orbitAnimationName} ${
        orbit.speed || 10
      }s linear infinite ${orbitIndex % 2 === 0 ? "normal" : "reverse"};}
      `);

      orbitDiv.classList.add(orbitCssRuleName);

      if (orbit.customCss) {
        // custom CSS
        orbitDiv.classList.add(...orbit.customCss.split(" "));
      }

      if (orbit.styles) {
        // custom inline styles
        Object.assign(orbitDiv.style, orbit.styles || {});
      }

      this.addCSSRule(`@keyframes ${orbitAnimationName} {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }`);

      this.container.appendChild(orbitDiv);

      // Add items
      orbit.items.forEach((item, itemIndex) => {
        const itemInitialOffset = (itemIndex / itemCount) * 100;
        const itemAnimationName = `orbit-${orbitIndex}-item-${itemIndex}`;

        // Create item container
        const itemDiv = document.createElement("div");
        itemDiv.style.position = "absolute";
        itemDiv.style.offsetPath = `circle(${orbitRadius}px at 50% 50%)`;
        itemDiv.style.offsetDistance = `${itemInitialOffset}%`;
        itemDiv.style.offsetRotate = "0deg";
        itemDiv.style.animation = `${itemAnimationName} ${
          orbit.speed || 10
        }s linear infinite ${orbitIndex % 2 === 0 ? "normal" : "reverse"}`;

        // Create img container
        const imgDiv = document.createElement("div");
        imgDiv.style.width = "48px";
        imgDiv.style.height = "48px";
        imgDiv.style.borderRadius = "50%";
        imgDiv.style.background = "white";
        imgDiv.style.display = "flex";
        imgDiv.style.alignItems = "center";
        imgDiv.style.justifyContent = "center";
        imgDiv.style.boxShadow =
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)";

        const img = document.createElement("img");
        img.src = item;
        img.alt = "";
        img.style.width = "32px";
        img.style.height = "32px";
        img.style.objectFit = "contain";

        this.addCSSRule(`@keyframes ${itemAnimationName} {
              0% { offset-distance: ${itemInitialOffset}%; offset-rotate: 360deg }
              100% { offset-distance: ${
                itemInitialOffset + 100
              }%; offset-rotate: 0deg }
          }`);

        imgDiv.appendChild(img);
        itemDiv.appendChild(imgDiv);

        orbitDiv.appendChild(itemDiv);
      });
    });
  }

  addCSSRule(cssRules) {
    const styleId = "latibro-core";
    let styleTag = document.getElementById(styleId);

    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.prepend(styleTag);
    }

    const styleSheet = [...document.styleSheets].find(
      (sheet) => sheet.ownerNode && sheet.ownerNode.id === styleId
    );

    if (styleSheet) {
      styleSheet.insertRule(cssRules, styleSheet.cssRules.length);
    }
  }
}

export default Orbital;
