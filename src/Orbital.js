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

    this.defineCSSRule(`.${containerCssRuleName} {
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
      const itemCount = orbit.items.length;
      const orbitDiv = document.createElement("div");
      const orbitCssRuleName = `orbit-${orbitIndex}`;
      const orbitAnimationName = `${orbitCssRuleName}-rotation`;

      // default CSS
      this.defineCSSRule(`.${orbitCssRuleName} {
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

      orbitDiv.classList.add("orbit", orbitCssRuleName);

      if (orbit.customCss) {
        // custom CSS
        orbitDiv.classList.add(...orbit.customCss.split(" "));
      }

      if (orbit.styles) {
        // custom inline styles
        Object.assign(orbitDiv.style, orbit.styles || {});
      }

      this.defineCSSRule(`@keyframes ${orbitAnimationName} {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }`);

      this.container.appendChild(orbitDiv);

      // Add items
      orbit.items.forEach((item, itemIndex) => {
        const itemInitialOffset = (itemIndex / itemCount) * 100;
        const itemCssRuleName = `orbit-wrapper-${orbitIndex}-${itemIndex}`;
        const itemAnimationName = `${itemCssRuleName}-anim`;
        const itemDiv = document.createElement("div");

        // default CSS
        this.defineCSSRule(`.${itemCssRuleName} {
          position: absolute;
          offset-path: circle(${orbitRadius}px at 50% 50%);
          offset-distance: ${itemInitialOffset}%;
          offset-rotate: 0deg;
          animation: ${itemAnimationName} ${
          orbit.speed || 10
        }s linear infinite ${orbitIndex % 2 === 0 ? "normal" : "reverse"};}
        `);

        itemDiv.classList.add("orbit-wrapper", itemCssRuleName);

        // Add img div
        const imageContainerCssRuleName = `orbit-item-${orbitIndex}-${itemIndex}`;
        const imgDiv = document.createElement("div");

        // default CSS
        this.defineCSSRule(`.${imageContainerCssRuleName} {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        `);

        imgDiv.classList.add("orbit-item", imageContainerCssRuleName);

        if (item.customCss) {
          // custom CSS
          imgDiv.classList.add(...item.customCss.split(" "));
        }

        if (item.styles) {
          // custom inline styles
          Object.assign(imgDiv.style, item.styles || {});
        }

        // Add img
        const itemImageCssRuleName = `orbit-img-${orbitIndex}-${itemIndex}`;
        const img = document.createElement("img");
        img.src = item.src ? item.src : item;
        img.alt = item.alt ? item.alt : "";

        // default CSS
        this.defineCSSRule(`.${itemImageCssRuleName} {
          width: 32px;
          height: 32px;
          object-fit: contain;
        `);

        img.classList.add("orbit-img", itemImageCssRuleName);

        this.defineCSSRule(`@keyframes ${itemAnimationName} {
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

  defineCSSRule(cssRules) {
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
