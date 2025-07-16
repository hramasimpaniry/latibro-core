class Orbital {
  constructor(container, options) {
    this.container = container;

    // default values
    this.defaults = {
      cssRuleName: {
        item: {
          wrapper: "orbit-item-wrapper",
          container: "orbit-item-container",
          content: "orbit-item-content",
          image: "orbit-item-img",
        },
        panel: {
          overlay: "orbit-panel-overlay",
          container: "orbit-panel",
          content: "orbit-panel-content",
          image: "orbit-panel-img",
          header: "orbit-panel-header",
          body: "orbit-panel-body",
          footer: "orbit-panel-footer",
          close: "orbit-panel-close",
        },
        animation: {
          paused: "orbit-animation-paused",
          moving: "orbit-animation-moving",
          closing: "orbit-animation-closing",
          opening: "orbit-animation-opening",
        },
      },
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
        content: {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          },
        },
        image: {
          style: {
            width: "32px",
            height: "32px",
          },
        },
      },
      panel: {
        position: "center",
        style: {
          top: () => document.documentElement.clientHeight / 2,
          left: () => document.documentElement.clientWidth / 2,
          width: () => document.documentElement.clientWidth - 15,
          height: () => document.documentElement.clientHeight - 15,
        },
        close: {
          label: "×",
          title: "Click to close this panel",
        },
        offset: {
          left: 15,
          top: 15,
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
    this.isPanelResize = false;

    // init
    this.init();

    this.handleResize = this.handleResize.bind(this);
    window.addEventListener("resize", this.handleResize);
  }

  init() {
    const containerCssRuleName = `orbital-container`;

    this.defineCSSRule(
      `.${containerCssRuleName}`,
      `
      width: ${this.defaults.container.style.width};
      height: ${this.defaults.container.style.height};
      background-color:${this.defaults.container.style.backgroundColor};
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    `
    );

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
      // TODO : this is inside a forEach loop. Check if duplicated
      this.defineCSSRule(
        `.${orbitCssRuleName}`,
        `
        position: absolute;
        width: ${this.defaults.orbit.scale.width * orbitRadius}px;
        height: ${this.defaults.orbit.scale.height * orbitRadius}px;
        border-radius: ${orbitBorderRadius};
        border: ${orbitBorder};
        animation: ${orbit?.speed <= 0 ? "none" : orbitAnimation};
        z-index: ${this.defaults.orbit.zIndexStart + (this.options.orbits.length - orbitIndex)};
        transition: ${this.defaults.orbit.style.transition};
      `
      );

      orbitDiv.classList.add("orbit", orbitCssRuleName);

      if (orbit.customCss) {
        // custom CSS
        orbitDiv.classList.add(...orbit.customCss.split(" "));
      }

      if (orbit.style) {
        // custom inline styles
        Object.assign(orbitDiv.style, orbit.style || {});
      }

      // TODO : this is inside a forEach loop. Check if duplicated
      this.defineCSSRule(
        `@keyframes ${orbitAnimationName}`,
        `
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        `
      );

      this.container.appendChild(orbitDiv);

      // Add items
      orbit.items.forEach((item, itemIndex) => {
        const itemInitialOffset = (itemIndex / itemCount) * 100;
        const itemCssRuleName = `${this.defaults.cssRuleName.item.wrapper}-${orbitIndex}-${itemIndex}`;
        const itemAnimationName = `${itemCssRuleName}-anim`;
        const itemAnimation = `${itemAnimationName} ${orbit.speed || this.defaults.orbit.speed}s linear infinite ${
          orbitIndex % 2 === 0 ? "normal" : "reverse"
        }`;

        // orbit-item-wrapper
        const itemWrapperDiv = document.createElement("div");

        this.defineCSSRule(
          `.${itemCssRuleName}`,
          `
          position: absolute;
          offset-path: circle(${orbitRadius}px at 50% 50%);
          offset-distance: ${itemInitialOffset}%;
          offset-rotate: 0deg;
          animation: ${orbit?.speed <= 0 ? "none" : itemAnimation};
          transition: ${this.defaults.orbit.style.transition};
        `
        );

        itemWrapperDiv.classList.add(`${this.defaults.cssRuleName.item.wrapper}`, itemCssRuleName);

        if (item.panel?.content) {
          itemWrapperDiv.classList.add("hasContent", itemCssRuleName);
        }

        // orbit-item-container
        const itemContainerCssRuleName = `${this.defaults.cssRuleName.item.container}-${orbitIndex}-${itemIndex}`;
        const itemContainerDiv = document.createElement("div");

        this.defineCSSRule(
          `.${itemContainerCssRuleName}`,
          `
          width: ${this.defaults.item.style.width};
          height: ${this.defaults.item.style.height};
          border-radius: ${this.defaults.item.style.borderRadius};
          background-color: ${this.defaults.item.style.backgroundColor};
          box-shadow: ${this.defaults.item.style.boxShadow};
          display: flex;
          align-items: center;
          justify-content: center;
        `
        );

        itemContainerDiv.classList.add(`${this.defaults.cssRuleName.item.container}`, itemContainerCssRuleName);

        if (item.customCss) {
          // custom CSS
          itemContainerDiv.classList.add(...item.customCss.split(" "));
        }

        if (item.style) {
          // custom inline styles
          Object.assign(itemContainerDiv.style, item.style || {});
        }

        if (item.content?.html) {
          // orbit-item-content
          const itemContentCssRuleName = `${this.defaults.cssRuleName.item.content}-${orbitIndex}-${itemIndex}`;
          const itemContentDiv = document.createElement("div");

          itemContentDiv.innerHTML = item.content?.html;

          this.defineCSSRule(
            `.${itemContentCssRuleName}`,
            `
            display: ${this.defaults.item.content.style.display};
            align-items: ${this.defaults.item.content.style.alignItems};
            justify-content: ${this.defaults.item.content.style.justifyContent};
            width: ${this.defaults.item.content.style.width};
            height: ${this.defaults.item.content.style.height};
          `
          );

          itemContentDiv.classList.add(`${this.defaults.cssRuleName.item.content}`, itemContentCssRuleName);

          if (item.content?.customCss) {
            // custom CSS
            itemContentDiv.classList.add(...item.content.customCss.split(" "));
          }

          if (item.content?.style) {
            // custom inline styles
            Object.assign(itemContentDiv.style, item.content.style || {});
          }

          itemContainerDiv.appendChild(itemContentDiv);
        } else {
          // orbit-item-img
          const itemImageCssRuleName = `${this.defaults.cssRuleName.item.image}-${orbitIndex}-${itemIndex}`;
          const img = document.createElement("img");
          img.src = item.src ? item.src : item;
          img.alt = item.alt ? item.alt : "";

          this.defineCSSRule(
            `.${itemImageCssRuleName}`,
            `
            width: ${this.defaults.item.image.style.width};
            height: ${this.defaults.item.image.style.height};
            object-fit: contain;
            -moz-user-select: -moz-none;
            -khtml-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;   
          `
          );

          img.classList.add(`${this.defaults.cssRuleName.item.image}`, itemImageCssRuleName);
          itemContainerDiv.appendChild(img);
        }

        this.defineCSSRule(
          `@keyframes ${itemAnimationName}`,
          `
          0% { offset-distance: ${itemInitialOffset}%; offset-rotate: 360deg }
          100% { offset-distance: ${itemInitialOffset + 100}%; offset-rotate: 0deg }
        `
        );

        const itemData = {
          parent: orbitDiv,
          element: itemContainerDiv, // orbit-item-container
          options: item,
          resumeTimeout: null,
          orbitIndex,
          itemIndex,
        };

        this.orbitItems.push(itemData);
        this.setupItemInteractivity(itemData);

        itemWrapperDiv.appendChild(itemContainerDiv);
        orbitDiv.appendChild(itemWrapperDiv);
      });
    });
  }

  createInteractivityCssRules() {
    if (!this.options.interactivity?.enabled) return;

    this.defineCSSRule(
      `.${this.defaults.cssRuleName.item.wrapper}.hasContent`,
      `
      cursor : pointer;
    `
    );

    this.defineCSSRule(
      `#${this.defaults.cssRuleName.panel.overlay}`,
      `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${this.defaults.panel.overlay.style.backgroundColor};
      display: flex;
      justify-content: center;
      align-items: flex-start;
    `
    );

    this.defineCSSRule(
      `.${this.defaults.cssRuleName.panel.container}`,
      `
      width: ${this.defaults.item.style.width};
      height: ${this.defaults.item.style.height};
      border-radius: ${this.defaults.item.style.borderRadius};      
      background: ${this.defaults.item.style.backgroundColor};
      box-shadow: ${this.defaults.item.style.boxShadow};
      display: flex ;
      align-items: center;
      justify-content: center;
    `
    );

    this.defineCSSRule(
      `.${this.defaults.cssRuleName.panel.close}`,
      `
      position: absolute;
      top: 4px;
      right: 10px;
      background: none;
      border: none;
      font-size: 2rem;
      cursor: pointer;
      opacity: .55;
    `
    );

    this.defineCSSRule(
      `.${this.defaults.cssRuleName.panel.close}:hover`,
      `
      opacity: .80;
    `
    );

    this.defineCSSRule(
      `.${this.defaults.cssRuleName.panel.content}`,
      `
      display: flex;
      flex-direction: column;
      padding: 15px;
      gap: 15px;
      width: 100%;
      height: 100%; 
    `
    );

    this.defineCSSRule(
      `.${this.defaults.cssRuleName.panel.header}`,
      `
      margin-right: 30px;
    `
    );

    this.defineCSSRule(
      `.${this.defaults.cssRuleName.panel.body}`,
      `
      flex: 1;
    `
    );

    this.defineCSSRule(
      `.${this.defaults.cssRuleName.panel.footer}`,
      `
    `
    );
  }

  pauseOrbitCssAnimation(orbitElement) {
    orbitElement.style.animationPlayState = "paused";
    orbitElement.classList.add(this.defaults.cssRuleName.animation.paused);

    const items = orbitElement.querySelectorAll(`.${this.defaults.cssRuleName.item.wrapper}`);
    items.forEach((el) => {
      el.style.animationPlayState = "paused";
    });
  }

  playOrbitCssAnimation(orbitElement) {
    orbitElement.style.animationPlayState = "";
    orbitElement.classList.remove(this.defaults.cssRuleName.animation.paused);

    const items = orbitElement.querySelectorAll(`.${this.defaults.cssRuleName.item.wrapper}`);
    items.forEach((el) => {
      el.style.animationPlayState = "";
    });
  }

  setupItemInteractivity(itemData) {
    if (!this.options.interactivity?.enabled) return;
    if (!itemData.options?.panel?.content) {
      return;
    }

    let { parent, element } = itemData; // parent : orbit, element : orbit-item-container

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
      }, this.options.interactivity.mouseLeaveDelay);
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
    const { element, options, orbitIndex, itemIndex } = this.currentItem;
    const { itemRect, panelRect } = this.getPanelFinalPosition();

    // backdrop overlay
    const overlay = document.createElement("div");
    overlay.id = `${this.defaults.cssRuleName.panel.overlay}`;
    overlay.style.zIndex = this.defaults.orbit.zIndexStart + this.options.orbits.length + 1;
    overlay.style.position = "fixed";
    document.body.appendChild(overlay);

    // panel
    const panel = element.cloneNode(true);
    panel.className = `${this.defaults.cssRuleName.panel.container} ${this.defaults.cssRuleName.panel.container}-${orbitIndex}-${itemIndex}`;
    panel.style.position = "fixed";
    panel.style.left = `${itemRect.left}px`;
    panel.style.top = `${itemRect.top}px`;
    panel.style.width = `${itemRect.width}px`;
    panel.style.height = `${itemRect.height}px`;
    panel.style.maxWidth = "100vw";
    panel.style.maxHeight = "100vh";
    panel.style.transition = "all 0.4s cubic-bezier(0.2, 0.8, 0.3, 1.2)";
    panel.style.zIndex = this.defaults.orbit.zIndexStart + this.options.orbits.length + 2;
    document.body.appendChild(panel);

    console.log(this.currentItem);

    if (options?.panel?.customCss) {
      // custom CSS
      panel.classList.add(...options.panel.customCss.split(" "));
    }

    // panel-img
    const panelImage = panel.querySelector(`.${this.defaults.cssRuleName.item.image}`);
    panelImage.classList.add(`${this.defaults.cssRuleName.panel.img}`);

    // panel-close
    const panelClose = document.createElement("button");
    panelClose.className = `${this.defaults.cssRuleName.panel.close}`;
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
    panelContent.className = `${this.defaults.cssRuleName.panel.content}`;
    panelContent.innerHTML = this.currentItem.options.panel.content;
    panelContent.style.display = "none";
    panel.appendChild(panelContent);

    this.panel = { overlay, panel, panelImage, panelClose, panelContent };

    // open panel animation

    this.animate(panel, [
      {
        // move to center
        before: function (el) {
          el.classList.add(self.defaults.cssRuleName.animation.moving);
        },
        duration: this.defaults.panel.animation.moving.duration,
        properties: {
          left: { to: `${panelRect.left}px` },
          top: { to: `${panelRect.top}px` },
        },
        after: function (el) {
          el.classList.remove(self.defaults.cssRuleName.animation.moving);
        },
      },
      {
        // scale up
        before: function (el) {
          el.classList.add(self.defaults.cssRuleName.animation.opening);
        },
        duration: this.defaults.panel.animation.opening.duration,
        properties: {
          borderRadius: {
            from: `${this.defaults.panel.animation.borderRadius.from}`,
            to: `${this.defaults.panel.animation.borderRadius.to}`,
          },
          width: {
            from: `${itemRect.width}px`,
            to: `${panelRect.width}px`,
          },
          height: {
            from: `${itemRect.height}px`,
            to: `${panelRect.height}px`,
          },
          transform: {
            to: `translate(-${panelRect.width / 2}px, -${panelRect.height / 2}px)`,
          },
        },
        after: function (el) {
          panelImage.style.display = "none";
          panelContent.style.display = "";
          panelClose.style.display = "";
          el.classList.remove(self.defaults.cssRuleName.animation.opening);
          self.isPanelBusy = false;
        },
      },
    ]);
  }

  _getPropertyValue(prop) {
    return typeof prop === "function" ? prop() : parseFloat(prop);
  }

  closePanel() {
    if (this.isPanelBusy) return;

    const self = this;
    this.isPanelBusy = true;
    const { parent, element, orbitIndex, itemIndex } = this.currentItem;
    const { overlay, panel, panelImage, panelClose, panelContent } = this.panel;
    const itemRect = element.getBoundingClientRect();
    let finalPosition = {};

    // close panel animation

    this.animate(panel, [
      {
        // scale down
        before: function (el) {
          panelImage.style.display = "";
          panelContent.style.display = "none";
          panelClose.style.display = "none";
          el.classList.add(self.defaults.cssRuleName.animation.closing);
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
          el.classList.remove(self.defaults.cssRuleName.animation.closing);
          self.pauseOrbitCssAnimation(parent);
        },
      },
      {
        // move to item
        before: function (el) {
          el.classList.add(self.defaults.cssRuleName.animation.moving);

          const { top, left } = document
            .querySelector(`.${self.defaults.cssRuleName.item.wrapper}-${orbitIndex}-${itemIndex}`)
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
          el.classList.remove(self.defaults.cssRuleName.animation.moving);
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

  defineCSSRule(cssSelector, cssDefinition) {
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

    const ruleStart = `${cssSelector} {`;
    if (!styleTag.textContent.includes(ruleStart)) {
      styleTag.textContent += `${ruleStart}${cssDefinition}}\n`; // Styles are Visible in the DOM
    }
  }

  elementIsVisibleInViewport(el, partiallyVisible = false) {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    return partiallyVisible
      ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
          ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
      : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
  }

  getPanelFinalPosition() {
    const { element } = this.currentItem;
    const itemRect = element.getBoundingClientRect();
    const globalPanelStyle = this.options?.panel?.style || {};
    const itemPanelStyle = this.currentItem.options?.panel?.style || {};
    const panelStyle = {
      ...this.defaults.panel.style,
      ...globalPanelStyle,
      ...itemPanelStyle,
    };

    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;

    const position =
      this.currentItem.options?.panel?.position || this.options?.panel?.position || this.defaults.panel.position;
    const offset = this.currentItem.options?.panel?.offset || this.options?.panel?.offset || this.defaults.panel.offset;

    let panelWidth = this._toPx(panelStyle.width, "width");
    let panelHeight = this._toPx(panelStyle.height, "height");

    if (panelWidth >= viewportWidth) {
      panelWidth = viewportWidth - offset.width;
    }

    if (panelHeight >= viewportHeight) {
      panelHeight = viewportHeight - offset.height;
    }

    const { x, y } = this.parsePanelPosition(position, panelWidth, panelHeight, viewportWidth, viewportHeight);

    let finalX = x;
    let finalY = y;

    if (finalX >= viewportWidth - panelWidth) {
      finalX = viewportWidth - panelWidth - offset.left;
    }

    if (finalX <= 0) {
      finalX = offset.left;
    }

    if (finalY >= viewportHeight - panelHeight) {
      finalY = viewportHeight - panelHeight - offset.height;
    }

    if (finalY <= 0) {
      finalY = offset.top;
    }

    // panel transformOrigin : center
    const translateX = panelWidth / 2;
    const translateY = panelHeight / 2;

    finalX += translateX;
    finalY += translateY;

    const panelRect = {
      left: finalX,
      top: finalY,
      width: panelWidth,
      height: panelHeight,
    };

    return {
      itemRect,
      panelRect,
    };
  }

  parsePanelPosition(position, panelWidth, panelHeight, viewportWidth, viewportHeight) {
    let x = (viewportWidth - panelWidth) / 2;
    let y = (viewportHeight - panelHeight) / 2;

    if (!position) return { x, y };

    const parts = position.trim().split(/\s+/);

    if (parts.length === 1) {
      const pos = parts[0];
      if (pos === "top" || pos === "bottom") {
        y = pos === "top" ? 0 : viewportHeight - panelHeight;
        x = (viewportWidth - panelWidth) / 2;
      } else if (pos === "left" || pos === "right") {
        x = pos === "left" ? 0 : viewportWidth - panelWidth;
        y = (viewportHeight - panelHeight) / 2;
      } else if (pos.endsWith("%")) {
        const percent = parseFloat(pos) / 100;
        x = (viewportWidth - panelWidth) * percent;
        y = (viewportHeight - panelHeight) * percent;
      }
      return { x, y };
    }

    if (parts.length >= 2) {
      if (parts[0] === "left") {
        x = 0;
      } else if (parts[0] === "right") {
        x = viewportWidth - panelWidth;
      } else if (parts[0].endsWith("%")) {
        x = (viewportWidth - panelWidth) * (parseFloat(parts[0]) / 100);
      }

      if (parts[1] === "top") {
        y = 0;
      } else if (parts[1] === "bottom") {
        y = viewportHeight - panelHeight;
      } else if (parts[1].endsWith("%")) {
        y = ((viewportHeight - panelHeight) * parseFloat(parts[1])) / 100;
      }

      if (parts.length === 4) {
        if (parts[2] === "left" || parts[2] === "right") {
          if (parts[2] === "left") {
            x = 0;
          } else {
            x = viewportWidth - panelWidth;
          }

          if (parts[3].endsWith("%")) {
            x += viewportWidth * (parseFloat(parts[3]) / 100);
          } else {
            x += parseFloat(parts[3]);
          }
        }

        if (parts[2] === "top" || parts[2] === "bottom") {
          if (parts[2] === "top") {
            y = 0;
          } else {
            y = viewportHeight - panelHeight;
          }

          if (parts[3].endsWith("%")) {
            y += viewportHeight * (parseFloat(parts[3]) / 100);
          } else {
            y += parseFloat(parts[3]);
          }
        }
      }
    }

    return { x, y };
  }

  _convertToPixels(value, property, element = document.body) {
    const testElement = document.createElement("div");

    // On évite d'affecter le layout
    testElement.style.position = "absolute";
    testElement.style.visibility = "hidden";
    testElement.style[property] = value;

    element.appendChild(testElement);

    // Récupération de la valeur calculée en pixels
    let pixels;
    if (property === "fontSize") {
      pixels = parseFloat(getComputedStyle(testElement).fontSize);
    } else {
      pixels = parseFloat(getComputedStyle(testElement)[property]);
    }

    element.removeChild(testElement);
    return pixels;
  }

  _toPx(value, property) {
    return typeof value == "number" ? value : this._convertToPixels(value, property);
  }

  handleResize() {
    setTimeout(() => {
      const { panel } = this.panel;
      if (this.isPanelOpen && panel) {
        const { panelRect } = this.getPanelFinalPosition();
        panel.style.left = `${panelRect.left}px`;
        panel.style.top = `${panelRect.top}px`;
        panel.style.width = `${panelRect.width}px`;
        panel.style.height = `${panelRect.height}px`;
        panel.style.transition = "none";
        panel.style.transform = `translate(-${panelRect.width / 2}px, -${panelRect.height / 2}px)`;
      }
    }, 0);
  }

  destroy() {
    if (this.cleanupInteractivity) {
      this.cleanupInteractivity();
    }
  }
}

export default Orbital;
