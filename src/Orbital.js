class Orbital {
  constructor(container, options) {
    this.container = container;

    // default values
    this.defaults = {
      orbitSpacing: 55,
      orbitRadius: 75,
      orbitSpeed: 10,
      orbit: {
        styles: {
          borderWidth: 2,
          borderStyle: "dashed",
          borderColor: "white",
        },
      },
      interactivity: {
        mouseLeaveDelay: 0,
      },
      panel: {
        content: `
        <div class="orbit-panel-header"></div>
        <div class="orbit-panel-body"></div>
        <div class="orbit-panel-footer"></div>
        `,
      },
    };

    // options
    this.options = options || {};
    this.options.orbits = this.options.orbits || [];
    this.options.orbitSpacing = this.options.orbitSpacing || this.defaults.orbitSpacing;
    this.options.interactivity = this.options.interactivity !== false;
    this.options.mouseLeaveDelay = this.options.mouseLeaveDelay || this.defaults.interactivity.mouseLeaveDelay;
    this.options.panel = this.options.panel || {};
    this.options.panel.container = this.options.panel.container || this.container;
    this.options.panel.offset = this.options.panel.offset || {};
    this.options.panel.offset.width = this.options.panel.offset.width || 15;
    this.options.panel.offset.height = this.options.panel.offset.height || 15;
    this.options.panel.close = this.options.panel.close || {};
    this.options.panel.close.label = this.options.panel.label || "×";
    this.options.panel.close.title = this.options.panel.title || "Close this panel";

    // internal objects
    this.orbitItems = [];
    this.currentItem = null;
    this.panel = null;
    this.isPanelOpen = false;

    // init
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
      background-color: #1a202c;
    }`);

    // default CSS
    this.container.classList.add(containerCssRuleName);

    if (this.options?.container?.customCss) {
      // custom CSS
      this.container.classList.add(...this.options.container.customCss.split(" "));
    }

    if (this.options?.container?.styles) {
      // custom inline styles
      Object.assign(this.container.style, this.options.container.styles || {});
    }

    this.createOrbits();
    this.createInteractivityCssRules();
  }

  createOrbits() {
    this.options.orbits.forEach((orbit, orbitIndex) => {
      const orbitRadius = (orbit.customRadius || this.defaults.orbitRadius) + orbitIndex * this.options.orbitSpacing;
      const itemCount = orbit.items.length;
      const orbitDiv = document.createElement("div");
      const orbitCssRuleName = `orbit-${orbitIndex}`;
      const orbitAnimationName = `${orbitCssRuleName}-animation`;
      const orbitBorderWidth = `${orbit?.styles?.borderWidth || this.defaults.orbit.styles.borderWidth}px`;
      const orbitBorderStyle = `${orbit?.styles?.borderStyle || this.defaults.orbit.styles.borderStyle}`;
      const orbitBorderColor = `${orbit?.styles?.borderColor || this.defaults.orbit.styles.borderColor}`;
      const orbitBorder = `${orbitBorderWidth} ${orbitBorderStyle} ${orbitBorderColor}`;
      const orbitAnimation = `${orbitAnimationName} ${orbit.speed || this.defaults.orbitSpeed}s linear infinite ${
        orbitIndex % 2 === 0 ? "normal" : "reverse"
      }`;
      const orbitZIndex = 1000 + (this.options.orbits.length - orbitIndex);

      // default CSS
      this.defineCSSRule(`.${orbitCssRuleName} {
          position: absolute;
          width: ${2 * orbitRadius}px;
          height: ${2 * orbitRadius}px;
          border-radius: 50%;
          border: ${orbitBorder};
          animation: ${orbitAnimation};
          z-index: ${orbitZIndex};
          transition: animation-play-state 0.5s ease-in-out;
      }`);

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
          animation: ${itemAnimationName} ${orbit.speed || this.defaults.orbitSpeed}s linear infinite ${
          orbitIndex % 2 === 0 ? "normal" : "reverse"
        };
          transition: animation-play-state 0.5s ease-in-out;
        }`);

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
        }`);

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
          -moz-user-select: -moz-none;
          -khtml-user-select: none;
          -webkit-user-select: none;
          -ms-user-select: none;
          user-select: none;   
        }`);

        img.classList.add("orbit-img", itemImageCssRuleName);

        this.defineCSSRule(`@keyframes ${itemAnimationName} {
          0% { offset-distance: ${itemInitialOffset}%; offset-rotate: 360deg }
          100% { offset-distance: ${itemInitialOffset + 100}%; offset-rotate: 0deg }
        }`);

        const itemContent = orbit.items.content || this.defaults.panel.content;

        const itemData = {
          parent: orbitDiv,
          element: imgDiv,
          content: itemContent,
          resumeTimeout: null,
        };

        this.orbitItems.push(itemData);
        this.setupItemInteractivity(itemData);

        imgDiv.appendChild(img);
        itemDiv.appendChild(imgDiv);
        orbitDiv.appendChild(itemDiv);
      });
    });
  }

  createInteractivityCssRules() {
    if (!this.options.interactivity) return;

    this.defineCSSRule(`.orbit-wrapper {
      cursor : pointer;
    }`);

    this.defineCSSRule(`#orbit-panel-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: flex-start;
      z-index: 2000;
    }`);

    this.defineCSSRule(`.orbit-panel {
      width: 48px;
      height: 48px;
      border-radius: 50%;      
      background: white;
      display: flex ;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    }`);

    this.defineCSSRule(`.orbit-panel-close {
      position: absolute;
      top: 4px;
      right: 10px;
      background: none;
      border: none;
      font-size: 2rem;
      cursor: pointer;
      opacity: .55;
    }`);

    this.defineCSSRule(`.orbit-panel-close:hover {
      opacity: .80;
    }`);

    this.defineCSSRule(`.orbit-panel-content {
      display: flex;
      flex-direction: column;
      padding: 15px;
      gap: 15px;
      width: -webkit-fill-available;
      height: -webkit-fill-available; 
    }`);

    this.defineCSSRule(`.orbit-panel-header {
      margin-right: 30px;
    }`);

    this.defineCSSRule(`.orbit-panel-body {
      flex: 1;
    }`);

    this.defineCSSRule(`.orbit-panel-footer {
    }`);
  }

  pauseOrbitCssAnimation(orbitElement) {
    orbitElement.style.animationPlayState = "paused";
    orbitElement.classList.add("orbit-paused");

    const items = orbitElement.querySelectorAll(".orbit-wrapper");
    items.forEach((el) => {
      el.style.animationPlayState = "paused";
    });
  }

  playOrbitCssAnimation(orbitElement) {
    orbitElement.style.animationPlayState = "";
    orbitElement.classList.remove("orbit-paused");

    const items = orbitElement.querySelectorAll(".orbit-wrapper");
    items.forEach((el) => {
      el.style.animationPlayState = "";
    });
  }

  setupItemInteractivity(itemData) {
    if (!this.options.interactivity) return;

    let { parent, element } = itemData; // parent : orbit, element : item

    element.addEventListener("click", () => this.handleItemClick(itemData));

    const handleMouseEnter = () => {
      if (itemData.resumeTimeout) {
        clearTimeout(itemData.resumeTimeout);
        itemData.resumeTimeout = null;
      }
      this.pauseOrbitCssAnimation(parent);
    };

    const handleMouseLeave = () => {
      itemData.resumeTimeout = setTimeout(() => {
        this.playOrbitCssAnimation(parent);
      }, this.options.mouseLeaveDelay);
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    itemData.cleanupInteractivity = () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }

  handleItemClick(itemData) {
    if (this.isPanelOpen) return;
    this.currentItem = itemData;
    this.openPanel();
  }

  openPanel() {
    const { parent, element } = this.currentItem;
    this.isPanelOpen = true;

    // backdrop overlay
    const overlay = document.createElement("div");
    overlay.id = "orbit-panel-overlay";
    overlay.style.zIndex = 1000 + this.options.orbits.length + 1;
    this.options.panel.container.appendChild(overlay);

    const itemRect = element.getBoundingClientRect();
    const containerRect = this.options.panel.container.getBoundingClientRect();

    // panel
    const panel = element.cloneNode(true);
    panel.className = "orbit-panel";
    panel.style.position = "fixed";
    panel.style.left = `${itemRect.left}px`;
    panel.style.top = `${itemRect.top}px`;
    panel.style.width = `${itemRect.width}px`;
    panel.style.height = `${itemRect.height}px`;
    panel.style.transition = "all 0.4s cubic-bezier(0.2, 0.8, 0.3, 1.2)";
    panel.style.zIndex = 1000 + this.options.orbits.length + 2;
    this.options.panel.container.appendChild(panel);

    // panel-thumbnail
    const panelThumbnail = panel.querySelector(".orbit-img");

    // panel-close
    const panelClose = document.createElement("button");
    panelClose.className = "orbit-panel-close";
    panelClose.title = this.options.panel.close.title;
    panelClose.innerHTML = this.options.panel.close.label;
    panelClose.style.display = "none";
    panel.appendChild(panelClose);

    panelClose.addEventListener("click", () => {
      this.closePanel();
    });

    overlay.addEventListener("click", () => {
      self.closePanel();
    });

    // panel-content
    const panelContent = document.createElement("div");
    panelContent.className = "orbit-panel-content";
    panelContent.innerHTML = this.currentItem.content;
    panelContent.style.display = "none";
    panel.appendChild(panelContent);

    this.panel = { overlay, panel, panelThumbnail, panelClose, panelContent };

    const centerX = containerRect.left + containerRect.width / 2 - itemRect.width / 2;
    const centerY = containerRect.top + containerRect.height / 2 - itemRect.height / 2;

    const initialWidth = itemRect.width;
    const finalWidth = containerRect.width - this.options.panel.offset.width;
    const initialHeight = itemRect.height;
    const finalHeight = containerRect.height - this.options.panel.offset.height;

    const self = this;

    // open panel animation

    this.animate(panel, [
      {
        before: function (el) {
          overlay.style.pointerEvents = "none";
        },
        duration: 400,
        properties: {
          left: { to: `${centerX}px` },
          top: { to: `${centerY}px` },
        },
      },
      {
        duration: 800,
        properties: {
          borderRadius: { from: `50%`, to: `4px` },
          width: { from: `${initialWidth}px`, to: `${finalWidth}px` },
          height: { from: `${initialHeight}px`, to: `${finalHeight}px` },
          transform: {
            from: "translate(0, 0)",
            to: `translate(-${(finalWidth - initialWidth) / 2}px, -${(finalHeight - initialHeight) / 2}px)`,
          },
        },
        after: function (el) {
          panelThumbnail.style.display = "none";
          panelContent.style.display = "";
          panelClose.style.display = "";
          overlay.style.pointerEvents = "";
        },
      },
    ]);
  }

  closePanel() {
    const { parent, element } = this.currentItem;
    const { overlay, panel, panelThumbnail, panelClose, panelContent } = this.panel;

    const itemRect = element.getBoundingClientRect();
    const containerRect = this.options.panel.container.getBoundingClientRect();

    const centerX = containerRect.left + containerRect.width / 2 - itemRect.width / 2;
    const centerY = containerRect.top + containerRect.height / 2 - itemRect.height / 2;

    const initialWidth = itemRect.width;
    const finalWidth = containerRect.width - this.options.panel.offset.width;
    const initialHeight = itemRect.height;
    const finalHeight = containerRect.height - this.options.panel.offset.height;

    const self = this;

    // close panel animation

    this.animate(panel, [
      {
        before: function (el) {
          overlay.style.pointerEvents = "none";
          panelThumbnail.style.display = "";
          panelContent.style.display = "none";
          panelClose.style.display = "none";
        },
        duration: 800,
        properties: {
          width: { from: `${finalWidth}px`, to: `${initialWidth}px` },
          height: { from: `${finalHeight}px`, to: `${initialHeight}px` },
          transform: {
            from: `translate(-${(finalWidth - initialWidth) / 2}px, -${(finalHeight - initialHeight) / 2}px)`,
            to: "translate(0, 0)",
          },
        },
      },
      {
        before: function (el) {
          self.pauseOrbitCssAnimation(parent);
        },
        duration: 400,
        properties: {
          opacity: { from: 1, to: 0 },
          borderRadius: { from: `4px`, to: `50%` },
          left: { to: `${itemRect.left}px` },
          top: { to: `${itemRect.top}px` },
        },
        after: function (el) {
          overlay.style.pointerEvents = "";
          panel.remove();
          overlay.remove();
          self.playOrbitCssAnimation(parent);
        },
      },
    ]);

    this.isPanelOpen = false;
  }

  cleanupInteractivity() {
    this.orbitItems.forEach((el) => {
      if (el.cleanupInteractivity) {
        el.cleanupInteractivity();
      }
    });
  }

  async animate(element, sequences) {
    for (const sequence of sequences) {
      element.style.transformOrigin = "center";
      await this._animateMultipleProperties(
        element,
        sequence.properties,
        sequence.duration,
        sequence.before,
        sequence.after
      );
    }
  }

  _animateMultipleProperties(element, properties, duration, before, after) {
    return new Promise((resolve) => {
      const transitions = [];

      if (typeof before === "function") {
        before(element, properties);
      }

      for (const prop in properties) {
        transitions.push(`${prop} ${duration}ms`);
        element.style[prop] = properties[prop].from;
      }

      element.style.transition = transitions.join(", ");

      void element.offsetWidth;

      for (const prop in properties) {
        element.style[prop] = properties[prop].to;
      }

      setTimeout(() => {
        if (typeof after === "function") {
          after(element, properties);
        }
        resolve();
      }, duration);
    });
  }

  defineCSSRule(cssRules) {
    const styleId = "latibro-core";
    let styleTag = document.querySelector(`#${styleId}`);

    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;

      const linkTags = document.head.getElementsByTagName("link");

      if (linkTags.length > 0) {
        document.head.insertBefore(styleTag, linkTags[0]);
      } else {
        document.head.appendChild(styleTag);
      }
    }

    styleTag.textContent += cssRules + "\n"; // Styles are Visible in the DOM
  }

  destroy() {
    if (this.cleanupInteractivity) {
      this.cleanupInteractivity();
    }
  }
}

export default Orbital;
