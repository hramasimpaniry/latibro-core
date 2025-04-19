class Orbital {
  constructor(container, options) {
    this.container = container;

    // default values
    this.defaults = {
      container: {
        style: {
          width: "500px",
          height: "500px",
          backgroundColor: "#1a202c",
        },
      },
      orbit: {
        spacing: 55,
        radius: 75,
        speed: 10,
        zIndexStart: 1000,
        scale: {
          width: 2,
          height: 2,
        },
        style: {
          borderWidth: 2,
          borderStyle: "dashed",
          borderColor: "white",
          borderRadius: "50%",
          transition: "animation-play-state 0.5s ease-in-out",
        },
      },
      item: {
        style: {
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          backgroundColor: "white",
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        },
      },
      thumbnail: {
        style: {
          width: "32px",
          height: "32px",
        },
      },
      panel: {
        style: {
          top: document.documentElement.clientHeight / 2,
          left: document.documentElement.clientWidth / 2,
          width: document.documentElement.clientWidth - 30,
          height: document.documentElement.clientHeight - 30,
        },
        close: {
          label: "×",
          title: "Click to close this panel",
        },
        offset: {
          width: 15,
          height: 15,
        },
        overlay: {
          style: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        animation: {
          borderRadius: {
            from: "50%",
            to: "4px",
          },
          moving: {
            duration: 400,
          },
          opening: {
            duration: 800,
          },
          closing: {
            duration: 800,
          },
        },
        backdrop: true,
      },
      interactivity: {
        enabled: false,
        mouseLeaveDelay: 0,
      },
    };

    // options
    this.options = options || {};
    this.options.orbits = this.options.orbits || [];
    this.options.orbitSpacing = this.options.orbitSpacing || this.defaults.orbit.spacing;
    this.options.interactivity = this.options.interactivity || {};
    this.options.interactivity.enabled = this.options.interactivity?.enabled || this.defaults.interactivity.enabled;
    this.options.interactivity.mouseLeaveDelay =
      this.options.interactivity.mouseLeaveDelay || this.defaults.interactivity.mouseLeaveDelay;
    this.options.panel = this.options.panel || {};
    this.options.panel.close = this.options.panel.close || {};
    this.options.panel.close.label = this.options.panel.label || this.defaults.panel.close.label;
    this.options.panel.close.title = this.options.panel.title || this.defaults.panel.close.title;
    this.options.panel.backdrop = this.options.panel.backdrop || this.defaults.panel.backdrop;

    // internal objects
    this.orbitItems = [];
    this.currentItem = null;
    this.panel = null;
    this.isPanelOpen = false;
    this.isPanelBusy = false;

    // init
    this.init();
  }

  init() {
    const containerCssRuleName = `orbital-container`;

    this.defineCSSRule(`.${containerCssRuleName} {
      width: ${this.defaults.container.style.width};
      height: ${this.defaults.container.style.height};
      background-color:${this.defaults.container.style.backgroundColor};
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }`);

    // default CSS
    this.container.classList.add(containerCssRuleName);

    if (this.options?.container?.customCss) {
      // custom CSS
      this.container.classList.add(...this.options.container.customCss.split(" "));
    }

    if (this.options?.container?.style) {
      // custom inline styles
      Object.assign(this.container.style, this.options.container.style || {});
    }

    this.createOrbits();
    this.createInteractivityCssRules();
  }

  createOrbits() {
    this.options.orbits.forEach((orbit, orbitIndex) => {
      const orbitRadius = (orbit.customRadius || this.defaults.orbit.radius) + orbitIndex * this.options.orbitSpacing;
      const itemCount = orbit.items.length;
      const orbitDiv = document.createElement("div");
      const orbitCssRuleName = `orbit-${orbitIndex}`;
      const orbitAnimationName = `${orbitCssRuleName}-animation`;
      const orbitBorderWidth = `${orbit?.style?.borderWidth || this.defaults.orbit.style.borderWidth}px`;
      const orbitBorderStyle = `${orbit?.style?.borderStyle || this.defaults.orbit.style.borderStyle}`;
      const orbitBorderColor = `${orbit?.style?.borderColor || this.defaults.orbit.style.borderColor}`;
      const orbitBorderRadius = `${orbit?.style?.borderRadius || this.defaults.orbit.style.borderRadius}`;
      const orbitBorder = `${orbitBorderWidth} ${orbitBorderStyle} ${orbitBorderColor}`;
      const orbitAnimation = `${orbitAnimationName} ${orbit.speed || this.defaults.orbit.speed}s linear infinite ${
        orbitIndex % 2 === 0 ? "normal" : "reverse"
      }`;

      // default CSS
      this.defineCSSRule(`.${orbitCssRuleName} {
          position: absolute;
          width: ${this.defaults.orbit.scale.width * orbitRadius}px;
          height: ${this.defaults.orbit.scale.height * orbitRadius}px;
          border-radius: ${orbitBorderRadius};
          border: ${orbitBorder};
          animation: ${orbit?.speed <= 0 ? "none" : orbitAnimation};
          z-index: ${this.defaults.orbit.zIndexStart + (this.options.orbits.length - orbitIndex)};
          transition: ${this.defaults.orbit.style.transition};
      }`);

      orbitDiv.classList.add("orbit", orbitCssRuleName);

      if (orbit.customCss) {
        // custom CSS
        orbitDiv.classList.add(...orbit.customCss.split(" "));
      }

      if (orbit.style) {
        // custom inline styles
        Object.assign(orbitDiv.style, orbit.style || {});
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
        const itemAnimation = `${itemAnimationName} ${orbit.speed || this.defaults.orbit.speed}s linear infinite ${
          orbitIndex % 2 === 0 ? "normal" : "reverse"
        }`;

        // default CSS
        this.defineCSSRule(`.${itemCssRuleName} {
          position: absolute;
          offset-path: circle(${orbitRadius}px at 50% 50%);
          offset-distance: ${itemInitialOffset}%;
          offset-rotate: 0deg;
          animation: ${orbit?.speed <= 0 ? "none" : itemAnimation};
          transition: ${this.defaults.orbit.style.transition};
        }`);

        itemDiv.classList.add("orbit-wrapper", itemCssRuleName);

        if (item.panel?.content) {
          itemDiv.classList.add("hasContent", itemCssRuleName);
        }

        // Add img div
        const imageContainerCssRuleName = `orbit-item-${orbitIndex}-${itemIndex}`;
        const imgDiv = document.createElement("div");

        // default CSS
        this.defineCSSRule(`.${imageContainerCssRuleName} {
          width: ${this.defaults.item.style.width};
          height: ${this.defaults.item.style.height};
          border-radius: ${this.defaults.item.style.borderRadius};
          background-color: ${this.defaults.item.style.backgroundColor};
          box-shadow: ${this.defaults.item.style.boxShadow};
          display: flex;
          align-items: center;
          justify-content: center;
        }`);

        imgDiv.classList.add("orbit-item", imageContainerCssRuleName);

        if (item.customCss) {
          // custom CSS
          imgDiv.classList.add(...item.customCss.split(" "));
        }

        if (item.style) {
          // custom inline styles
          Object.assign(imgDiv.style, item.style || {});
        }

        // Add img
        const itemImageCssRuleName = `orbit-img-${orbitIndex}-${itemIndex}`;
        const img = document.createElement("img");
        img.src = item.src ? item.src : item;
        img.alt = item.alt ? item.alt : "";

        // default CSS
        this.defineCSSRule(`.${itemImageCssRuleName} {
          width: ${this.defaults.thumbnail.style.width};
          height: ${this.defaults.thumbnail.style.height};
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

        const itemData = {
          parent: orbitDiv,
          element: imgDiv,
          options: item,
          resumeTimeout: null,
          orbitIndex,
          itemIndex,
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
    if (!this.options.interactivity?.enabled) return;

    this.defineCSSRule(`.orbit-wrapper.hasContent {
      cursor : pointer;
    }`);

    this.defineCSSRule(`#orbit-panel-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${this.defaults.panel.overlay.style.backgroundColor};
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }`);

    this.defineCSSRule(`.orbit-panel {
      width: ${this.defaults.item.style.width};
      height: ${this.defaults.item.style.height};
      border-radius: ${this.defaults.item.style.borderRadius};      
      background: ${this.defaults.item.style.backgroundColor};
      box-shadow: ${this.defaults.item.style.boxShadow};
      display: flex ;
      align-items: center;
      justify-content: center;
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
      width: 100%;
      height: 100%; 
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
    if (!this.options.interactivity?.enabled) return;
    if (!itemData.options?.panel?.content) {
      return;
    }

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
    const self = this;
    this.isPanelOpen = true;
    this.isPanelBusy = true;
    const { element } = this.currentItem;
    const globalPanelStyle = this.options?.panel?.style || {};
    const itemPanelStyle = this.currentItem.options?.panel?.style || {};

    // merge props
    const panelStyle = {
      ...this.defaults.panel.style,
      ...globalPanelStyle,
      ...itemPanelStyle,
    };

    // backdrop overlay
    const overlay = document.createElement("div");
    overlay.id = "orbit-panel-overlay";
    overlay.style.zIndex = this.defaults.orbit.zIndexStart + this.options.orbits.length + 1;
    overlay.style.position = "fixed";
    document.body.appendChild(overlay);

    const itemRect = element.getBoundingClientRect();

    // panel
    const panel = element.cloneNode(true);
    panel.className = "orbit-panel";
    panel.style.position = "fixed";
    panel.style.left = `${itemRect.left}px`;
    panel.style.top = `${itemRect.top}px`;
    panel.style.width = `${itemRect.width}px`;
    panel.style.height = `${itemRect.height}px`;
    panel.style.transition = "all 0.4s cubic-bezier(0.2, 0.8, 0.3, 1.2)";
    panel.style.zIndex = this.defaults.orbit.zIndexStart + this.options.orbits.length + 2;
    document.body.appendChild(panel);

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

    if (this.options.panel.backdrop) {
      overlay.addEventListener("click", () => {
        this.closePanel();
      });
    }

    // panel-content
    const panelContent = document.createElement("div");
    panelContent.className = "orbit-panel-content";
    panelContent.innerHTML = this.currentItem.options.panel.content;
    panelContent.style.display = "none";
    panel.appendChild(panelContent);

    this.panel = { overlay, panel, panelThumbnail, panelClose, panelContent };

    const centerX = parseFloat(panelStyle.left);
    const centerY = parseFloat(panelStyle.top);

    // open panel animation

    this.animate(panel, [
      {
        // move to center
        before: function (el) {
          el.classList.add("animation-moving");
        },
        duration: this.defaults.panel.animation.moving.duration,
        properties: {
          left: { to: `${centerX}px` },
          top: { to: `${centerY}px` },
        },
        after: function (el) {
          el.classList.remove("animation-moving");
        },
      },
      {
        // scale up
        before: function (el) {
          el.classList.add("animation-opening");
        },
        duration: this.defaults.panel.animation.opening.duration,
        properties: {
          borderRadius: {
            from: `${this.defaults.panel.animation.borderRadius.from}`,
            to: `${this.defaults.panel.animation.borderRadius.to}`,
          },
          width: {
            from: `${itemRect.width}px`,
            to: typeof panelStyle.width === "number" ? `${panelStyle.width}px` : panelStyle.width,
          },
          height: {
            from: `${itemRect.height}px`,
            to: typeof panelStyle.height === "number" ? `${panelStyle.height}px` : panelStyle.height,
          },
          left: {
            from: -1 * (typeof panelStyle.left === "number" ? `${panelStyle.left}px` : panelStyle.left),
            to: typeof panelStyle.left === "number" ? `${panelStyle.left}px` : panelStyle.left,
          },
          top: {
            from: -1 * (typeof panelStyle.top === "number" ? `${panelStyle.top}px` : panelStyle.top),
            to: typeof panelStyle.top === "number" ? `${panelStyle.top}px` : panelStyle.top,
          },
          transform: {
            from: `translate(${centerX}, ${centerY})`,
            to: `translate(-${panelStyle.width / 2}px, -${panelStyle.height / 2}px)`,
          },
        },
        after: function (el) {
          panelThumbnail.style.display = "none";
          panelContent.style.display = "";
          panelClose.style.display = "";
          el.classList.remove("animation-opening");
          self.isPanelBusy = false;
        },
      },
    ]);
  }

  closePanel() {
    if (this.isPanelBusy) return;

    const self = this;
    this.isPanelBusy = true;
    const { parent, element, orbitIndex, itemIndex } = this.currentItem;
    const { overlay, panel, panelThumbnail, panelClose, panelContent } = this.panel;
    const itemRect = element.getBoundingClientRect();
    let finalPosition = {};

    // close panel animation

    this.animate(panel, [
      {
        // scale down
        before: function (el) {
          panelThumbnail.style.display = "";
          panelContent.style.display = "none";
          panelClose.style.display = "none";
          el.classList.add("animation-closing");
        },
        duration: this.defaults.panel.animation.closing.duration,
        properties: {
          width: { to: `${itemRect.width}px` },
          height: { to: `${itemRect.height}px` },
          transform: {
            from: "translate(0, 0)",
            to: "translate(0, 0)",
          },
        },
        after: function (el) {
          el.classList.remove("animation-closing");
          self.pauseOrbitCssAnimation(parent);
        },
      },
      {
        // move to item
        before: function (el) {
          el.classList.add("animation-moving");

          const { top, left } = document
            .querySelector(`.orbit-wrapper-${orbitIndex}-${itemIndex}`)
            .getBoundingClientRect();
          finalPosition.top = top;
          finalPosition.left = left;
        },
        duration: this.defaults.panel.animation.moving.duration,
        properties: {
          opacity: { from: 100, to: 0 },
          borderRadius: {
            from: `${this.defaults.panel.animation.borderRadius.to}`,
            to: `${this.defaults.panel.animation.borderRadius.from}`,
          },
          left: { from: `${itemRect.left}px`, to: `${finalPosition.left}px` },
          top: { from: `${itemRect.top}px`, to: `${finalPosition.top}px` },
          transform: {
            from: "translate(0, 0)",
            to: "translate(0, 0)",
          },
        },
        after: function (el) {
          panel.remove();
          overlay.remove();
          self.playOrbitCssAnimation(parent);
          el.classList.remove("animation-moving");
          self.isPanelBusy = false;
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
      await this._animate(element, sequence.properties, sequence.duration, sequence.before, sequence.after);
    }
  }

  _animate(element, properties, duration, before, after) {
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
