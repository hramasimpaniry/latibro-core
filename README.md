# latibro-core &#x1F30C;

Latibro (read backwards) is a lightweight JavaScript library for creating animated orbital components.

## Features
- Dynamic circular orbit animations.
- Supports multiple orbits with independent speeds.
- Fully customizable:
  - Orbit styles (color, thickness, etc.).
  - Element animations and spacing.
- Designed for performance and ease of use.


## Installation

```bash
npm install latibro-core
```

## Usage

### Basic Example

```javascript
import Orbital from 'latibro-core';

const container = document.getElementById('orbital-container');
const config = {
  orbits: [
    { items: ['https://via.placeholder.com/50', 'https://via.placeholder.com/50'], speed: 10 },
    { items: ['https://via.placeholder.com/50', 'https://via.placeholder.com/50'], speed: 15 },
    { items: ['https://via.placeholder.com/50', 'https://via.placeholder.com/50'], speed: 20 },    
  ]
};

new Orbital(container, config);
```

## Props

### Main Props (Options for Orbital)

| Prop                         | Type                | Default                | Description                                                          |
| ---------------------------- | ------------------- | ---------------------- | -------------------------------------------------------------------- |
| <code>orbits</code>          | <code>Array</code>  | <code>[]</code>        | List of orbit objects. Each orbit defines items and styling options. |
| <code>orbitSpacing</code>    | <code>Number</code> | <code>55</code>        | The spacing (in pixels) between consecutive orbits.                  |
| <code>backgroundColor</code> | <code>String</code> | <code>"#1a202c"</code> | The background color of the orbital container.                       |

### Orbit Object (in <code>orbits</code> array)
Each orbit object can include the following properties:

| Prop                      | Type                | Default               | Description                                                  |
| ------------------------- | ------------------- | --------------------- | ------------------------------------------------------------ |
| <code>items</code>        | <code>Array</code>  | <code>[]</code>       | Array of image URLs or content to display as orbiting items. |
| <code>customRadius</code> | <code>Number</code> | <code>75</code>       | Custom radius (in pixels) for the orbit.                     |
| <code>borderColor</code>  | <code>String</code> | <code>"white"</code>  | The color of the orbit border.                               |
| <code>borderStyle</code>  | <code>String</code> | <code>"dashed"</code> | The style of the orbit border (e.g., solid, dotted, dashed). |
| <code>borderWidth</code>  | <code>Number</code> | <code>2</code>        | The width of the orbit border (in pixels).                   |
| <code>customCss</code>    | <code>String</code> | <code>null</code>     | Custom CSS classes to apply to the orbit element.            |
| <code>speed</code>        | <code>Number</code> | <code>10</code>       | Speed of rotation (in seconds for one full rotation).        |

### Item Animations
Each item in an orbit is animated based on its position in the array. The <code>offsetPath</code>, <code>offsetDistance</code>, and <code>offsetRotate</code> properties are used to control the movement and rotation of the items along the orbit path.

## Development

Run the development server:
```bash
npm run dev
```
  
Build the library for production:
```bash
npm run build
```

## License
This project is licensed under the [MIT License](https://github.com/hramasimpaniry/latibro-core/blob/main/LICENSE).

---