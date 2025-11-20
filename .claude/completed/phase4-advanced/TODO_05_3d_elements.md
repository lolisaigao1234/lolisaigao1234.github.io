# TODO #5: 3D Background Elements (Three.js)

**Priority:** LOW
**Difficulty:** High
**Estimated Time:** 4-5 days
**Status:** 📋 Planned

---

## Overview

Integrate Three.js to create immersive 3D background elements. This is an advanced feature that adds significant visual wow-factor but requires substantial development effort.

---

## Proposed 3D Elements

### 1. Floating Geometric Shapes
- Low-poly 3D objects (icosahedrons, torus, etc.)
- Slow rotation and float animation
- Responds to mouse movement
- Subtle glow effects

### 2. Particle Field (3D)
- WebGL-based particle system
- Better performance than 2D canvas
- Depth-based opacity
- Interactive mouse trails

### 3. Abstract Background Scene
- Morphing blob shapes
- Gradient materials
- Post-processing effects (bloom, glow)

---

## Implementation Approach

```javascript
import * as THREE from 'three';

class ThreeBackground {
  constructor(container) {
    this.container = container;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    this.init();
  }

  init() {
    // Setup renderer
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const pointLight = new THREE.PointLight(0x007AFF, 1);
    pointLight.position.set(5, 5, 5);
    this.scene.add(ambientLight, pointLight);

    // Create geometry
    this.createGeometry();

    // Start animation loop
    this.animate();

    // Handle resize
    window.addEventListener('resize', () => this.onResize());
  }

  createGeometry() {
    // Create floating icosahedron
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshPhongMaterial({
      color: 0x007AFF,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);

    this.camera.position.z = 5;
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Rotate mesh
    if (this.mesh) {
      this.mesh.rotation.x += 0.001;
      this.mesh.rotation.y += 0.002;
    }

    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

// Initialize
const threeBackground = new ThreeBackground(document.getElementById('three-container'));
```

---

## Performance Considerations

- **Bundle Size:** Three.js is ~600KB (can be reduced with tree-shaking)
- **GPU Usage:** Requires decent GPU for smooth 60 FPS
- **Mobile:** Consider disabling or using simpler scene on mobile
- **Battery:** WebGL can drain battery on mobile devices

---

## Alternative: CSS 3D Transforms

For simpler 3D effects without Three.js:

```css
.floating-shape {
  transform: perspective(1000px) rotateX(10deg) rotateY(20deg);
  transform-style: preserve-3d;
  animation: float3d 6s ease-in-out infinite;
}

@keyframes float3d {
  0%, 100% {
    transform: perspective(1000px) rotateX(10deg) rotateY(20deg) translateZ(0);
  }
  50% {
    transform: perspective(1000px) rotateX(-10deg) rotateY(-20deg) translateZ(20px);
  }
}
```

---

**Status:** Low priority (nice-to-have)
**Dependencies:** Three.js library (~600KB)
**Blocking:** None
**Estimated Completion:** 4-5 days
