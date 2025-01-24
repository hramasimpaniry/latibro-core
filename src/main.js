import Orbital from './Orbital.js';

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
      borderColor: 'white',
      borderCssClass: 'border-solid'
    },    
  ],
};

new Orbital(container, config);