#### accelerometer
accelerometer is SVG UI control

## 🎯 Accelerometer Components

[![Vanilla JS](https://img.shields.io/badge/vanilla-JS-yellow)](https://developer.mozilla.org/docs/Web/JavaScript)
[![No Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen)](https://bundlephobia.com/)
[![MIT License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Size](https://img.shields.io/badge/size-4KB-gree)](https://bundlephobia.com/)

Ultra-minimalist dual-axis accelerometer controls with spring physics. Perfect for games, creative coding, and UI experiments.

### 🚀 Quick Start

```html
<!-- HTML -->
<div class="h-accel">
    <div class="h-track" id="trackX"></div>
    <div class="h-knob" id="knobX"></div>
</div>
<div id="valueX">0.00</div>

<script>
// JavaScript
const xAccel = new HorizontalAccelerometer('knobX', 'trackX', 'valueX');

function animate() {
    const x = xAccel.updatePhysics(); // -1 to 1
    // Use x in your app
    requestAnimationFrame(animate);
}
animate();
</script>
```

### 📦 Components

| Component | Purpose | Values |
|-----------|---------|---------|
| `HorizontalAccelerometer` | Left/right control | -1 (left) to 1 (right) |
| `VerticalAccelerometer` | Up/down control | -1 (down) to 1 (up) |
| `CoordinateTransformer` | Math utilities | Angle conversion |
| `ResultDisplay` | Vector visualization | (X, Y) with compass angle |

### 🎮 Features

- **Spring physics** - Automatically returns to zero
- **Natural dragging** - Intuitive mouse/touch control
- **Color feedback** - Visual acceleration indication
- **Compass coordinates** - 0° = UP, 90° = RIGHT
- **No dependencies** - Pure vanilla JavaScript

### 📖 Usage Examples

#### Game Controller
```javascript
const xAccel = new HorizontalAccelerometer('xCtrl', 'xTrack', 'xVal');
const yAccel = new VerticalAccelerometer('yCtrl', 'yTrack', 'yVal');

function gameLoop() {
    const dx = xAccel.updatePhysics();
    const dy = yAccel.updatePhysics();
    player.x += dx * speed;
    player.y += dy * speed;
    requestAnimationFrame(gameLoop);
}
```

#### Programmatic Control
```javascript
accel.setValue(0.5);    // Move to position
accel.setValue(0);      // Reset to center
```

### 🎯 Coordinate System

```
0° = UP (Positive Y)
90° = RIGHT (Positive X)
180° = DOWN (Negative Y)
270° = LEFT (Negative X)
```

### 📄 License

MIT © 2024 - Free to use in personal and commercial projects
