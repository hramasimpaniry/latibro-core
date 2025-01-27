declare module "latibro-core" {
    export interface Orbit {
      items: string[];
      customRadius?: number;
      borderColor?: string;
      borderStyle?: string;
      borderWidth?: number;
      customCss?: string;
      speed?: number;
    }
  
    export interface OrbitalOptions {
      orbits: Orbit[];
      orbitSpacing?: number;
      backgroundColor?: string;
    }
  
    export default class Orbital {
      constructor(container: HTMLElement, options: OrbitalOptions);
    }
  }
  