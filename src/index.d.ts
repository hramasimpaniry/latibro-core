declare module "latibro-core" {

  export interface ItemPanelOptions {
    content?: string;
    customCss?: string;
    style?: Partial<CSSStyleDeclaration>;
  }  
  
  export interface OrbitItemObject {
    src: string;    
    customCss?: string;
    style?: Partial<CSSStyleDeclaration>;
    panel?: ItemPanelOptions;
  }
  
  export interface OrbitOptions {
    items: (string | OrbitItemObject)[];
    customRadius?: number;  
    borderWidth?: number;
    customCss?: string;
    style?: Partial<CSSStyleDeclaration>;    
    speed?: number;
  }

  export interface ContainerOptions {   
    customCss?: string;
    style?: Partial<CSSStyleDeclaration>;
  } 
  
  export interface PanelOptions {
    container?: HTMLElement;
    offset?: {
      width?: number;
      height?: number;
    };
    close?: {
      label?: string;
      title?: string;
    };
    customCss?: string;
    style?: Partial<CSSStyleDeclaration>;
  }

  export interface OrbitalOptions {
    container?: ContainerOptions;
    orbits: OrbitOptions[];
    orbitSpacing?: number;
    interactivity?: boolean;
    panel?: PanelOptions;
    mouseLeaveDelay?: number;
  }

  export interface AnimationSequence {
    duration: number;
    properties: Record<string, {
      from?: string;
      to: string;
    }>;
    before?: (el: HTMLElement) => void;
    after?: (el: HTMLElement) => void;    
  }

  export default class Orbital {
    constructor(container: HTMLElement, options: OrbitalOptions);
    private init(): void;
    private createOrbits(): void;
    private defineCSSRule(cssRules: string): void;
    private animate(element: HTMLElement, sequences: AnimationSequence[]): Promise<void>;
    private _animate(
      element: HTMLElement,
      duration: number,
      properties: Record<string, { 
        from?: string; 
        to: string 
      }>,
      before?: (el: HTMLElement) => void,
      after?: (el: HTMLElement) => void
    ): Promise<void>;
    private openPanel(): void;
    private closePanel(): void;
    private setupItemInteractivity(itemData: any): void;
  }    
}
  