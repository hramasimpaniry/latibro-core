declare module "latibro-core" {
  export interface OrbitItemObject {
    src: string;    
    customCss?: string;
    styles?: Partial<CSSStyleDeclaration>;
  }
  
  export interface OrbitOptions {
    items: (string | OrbitItemObject)[];
    customRadius?: number;  
    borderWidth?: number;
    customCss?: string;
    styles?: Partial<CSSStyleDeclaration>;    
    speed?: number;
  }

  export interface ContainerOptions {   
    customCss?: string;
    styles?: Partial<CSSStyleDeclaration>;
  }  

  export interface OrbitalOptions {
    container?: ContainerOptions;
    orbits: OrbitOptions[];
    orbitSpacing?: number;
  }    

    export default class Orbital {
      constructor(container: HTMLElement, options: OrbitalOptions);
      private init(): void;
      private createOrbits(): void;
      private defineCSSRule(cssRules: string): void;
    }    
  }
  