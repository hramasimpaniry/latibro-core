declare module "latibro-core" {
  export interface OrbitItemObject {
    src: string;    
    customCss?: string;
    styles?: Partial<CSSStyleDeclaration>;
  }
  
  export interface OrbitOptions {
    items: (string | OrbitItemObject)[];
    customRadius?: number;
    /**
     * @deprecated Use `styles.borderColor` instead.
     */    
    borderColor?: string;
    /**
     * @deprecated Use `styles.borderStyle` instead.
     */    
    borderStyle?: string;
    /**
     * @deprecated Use `styles.borderWidth` instead.
     */    
    borderWidth?: number;
    customCss?: string;
    styles?: Partial<CSSStyleDeclaration>;    
    speed?: number;
  }

  export interface ContainerOptions {
    /**
     * @deprecated Use `styles.backgroundColor` instead.
     */  
    backgroundColor?: string;    
    customCss?: string;
    styles?: Partial<CSSStyleDeclaration>;
  }  

  export interface OrbitalOptions {
    container?: ContainerOptions;
    orbits: OrbitOptions[];
    orbitSpacing?: number;
    /**
     * @deprecated Use `container.styles.backgroundColor` instead.
     */        
    backgroundColor?: string;
  }    

    export default class Orbital {
      constructor(container: HTMLElement, options: OrbitalOptions);
      private init(): void;
      private createOrbits(): void;
      private defineCSSRule(cssRules: string): void;
    }    
  }
  