class Orbital {
  constructor(container, options) {
    this.container = container;
    this.orbits = options.orbits || [];
    this.orbitSpacing = options.orbitSpacing || 55;
    this.backgroundColor = options.backgroundColor || "#1a202c";
    this.init();
  }

  init() {
    this.container.style.position = "relative";
    this.container.style.overflow = "hidden";
    this.container.style.display = "flex";
    this.container.style.alignItems = "center";
    this.container.style.justifyContent = "center";
    this.container.style.backgroundColor = this.backgroundColor;

    // Add orbits
    this.orbits.forEach((orbit, orbitIndex) => {
      const orbitRadius =
        (orbit.customRadius || 75) + orbitIndex * this.orbitSpacing;
      const orbitAnimationName = `orbit-${orbitIndex}-rotation`;
      const itemCount = orbit.items.length;
      const orbitCssList = orbit.customCss ? orbit.customCss.split(" ") : [];

      // Create orbit
      const orbitDiv = document.createElement("div");
      orbitDiv.style.position = "absolute";
      orbitDiv.style.width = `${2 * orbitRadius}px`;
      orbitDiv.style.height = `${2 * orbitRadius}px`;
      orbitDiv.style.borderRadius = "50%";
      orbitCssList.forEach(function (css) {
        orbitDiv.classList.add(css);
      });
      orbitDiv.style.border =
        orbitCssList.length <= 0
          ? `${orbit.borderWidth || 2}px ${orbit.borderStyle || "dashed"} ${
              orbit.borderColor || "white"
            }`
          : "";
      orbitDiv.style.animation = `${orbitAnimationName} ${
        orbit.speed || 10
      }s linear infinite ${orbitIndex % 2 === 0 ? "normal" : "reverse"}`;

      this.addAnimation(`@keyframes ${orbitAnimationName} {
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

        this.addAnimation(`@keyframes ${itemAnimationName} {
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

  addAnimation(keyframes) {
    const styleId = "latibro-core";
    let styleTag = document.getElementById(styleId);

    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    const styleSheet = [...document.styleSheets].find(
      (sheet) => sheet.ownerNode && sheet.ownerNode.id === styleId
    );

    if (styleSheet) {
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    }
  }
}

export default Orbital;
