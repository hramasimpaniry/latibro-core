import Orbital from '../src/Orbital';

const container = document.getElementById('orbital-container');

const config = {
  orbits: [
    {
      items: [
        'https://placehold.co/50',
        'https://placehold.co/50',
        'https://placehold.co/50',
      ],
      speed: 10,
      borderColor: 'orange',
    },
    {
      items: [
        'https://placehold.co/50',
        'https://placehold.co/50',
        'https://placehold.co/50',
      ],
      speed: 15,
      customRadius: 100,
      borderColor: 'cyan',
    },
    {
      items: [
        'https://placehold.co/50',
        'https://placehold.co/50',
        'https://placehold.co/50',
      ],
      speed: 20,
      customRadius: 100,
      // If customCss is provided, inline styling like 
      // borderWidth, borderColor or borderStyle are ignored.
      customCss: 'border-solid border-red border-1', 
      borderColor: 'white',
      borderStyle: 'dotted',
      borderWidth: 5
    },    
  ],
};

new Orbital(container, config);