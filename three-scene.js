// ----------------------------------------------------
// THREE.JS 3D SCENE SETUPS (Hero & CTA Waitlist)
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  // Check if Three.js is loaded
  if (typeof THREE === 'undefined') {
    console.error('Three.js failed to load via CDN.');
    return;
  }

  // Common variables
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;

  // Track mouse coordinates globally
  window.addEventListener('mousemove', (e) => {
    // Normalize coordinates from -1 to 1
    targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
    targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // --------------------------------------------------
  // 1. HERO CANVAS SCENE
  // --------------------------------------------------
  const initHeroScene = () => {
    const container = document.getElementById('canvas-3d');
    if (!container) return;

    // Dimensions
    let width = container.clientWidth;
    let height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 7;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for holding our 3D elements (enables mouse parallax independently)
    const objectGroup = new THREE.Group();
    scene.add(objectGroup);

    // Geodesic Icosahedron (Base Mesh)
    const geometry = new THREE.IcosahedronGeometry(2, 1); // Subdivision 1 = geodesic
    
    // Core physical translucent material
    const physicalMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x4F6EF7,          // Electric blue
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.35,
      transmission: 0.6,        // Glass refraction
      thickness: 1.2,           // Refraction bending depth
      side: THREE.DoubleSide
    });

    // Wireframe overlay material
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00E5C4,          // Cyan NFC
      wireframe: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    // Create meshes
    const coreMesh = new THREE.Mesh(geometry, physicalMaterial);
    const wireframeMesh = new THREE.Mesh(geometry, wireframeMaterial);
    
    // Scale wireframe slightly outward to avoid z-fighting
    wireframeMesh.scale.setScalar(1.002);

    // Small glowing inner sphere
    const innerGeo = new THREE.SphereGeometry(0.7, 16, 16);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xA78BFA,          // Soft violet
      transparent: true,
      opacity: 0.6
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);

    objectGroup.add(coreMesh);
    objectGroup.add(wireframeMesh);
    objectGroup.add(innerMesh);

    // Add floating particles
    const particleCount = 250;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = [];

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Box coordinates
      positions[i] = (Math.random() - 0.5) * 12;
      positions[i + 1] = (Math.random() - 0.5) * 12;
      positions[i + 2] = (Math.random() - 0.5) * 12;

      // Speed rates for particles
      speeds.push({
        x: (Math.random() - 0.5) * 0.005,
        y: Math.random() * 0.008 + 0.002,
        z: (Math.random() - 0.5) * 0.005
      });
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle texture / material
    const particleMat = new THREE.PointsMaterial({
      color: 0xA78BFA,
      size: 0.06,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x4F6EF7, 2.5, 20); // Blue light
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00E5C4, 2, 20);  // Cyan light
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Interactive Hover State
    let isHovered = false;
    let targetScale = 1.0;
    let pulseTime = 0;

    container.addEventListener('mouseenter', () => {
      isHovered = true;
      targetScale = 1.15;
      wireframeMaterial.color.setHex(0xFFFFFF); // Glow white on hover
    });

    container.addEventListener('mouseleave', () => {
      isHovered = false;
      targetScale = 1.0;
      wireframeMaterial.color.setHex(0x00E5C4); // Restore cyan
    });

    // Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Continuous rotation of the main shape
      coreMesh.rotation.x += 0.002;
      coreMesh.rotation.y += 0.003;
      wireframeMesh.rotation.x += 0.002;
      wireframeMesh.rotation.y += 0.003;

      // Pulse inner core scale slightly
      const innerScaleVal = 1.0 + Math.sin(elapsedTime * 3) * 0.12;
      innerMesh.scale.setScalar(innerScaleVal);

      // Lerp mouse coordinates for smooth parallax
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      // Apply mouse parallax rotation to the holding group
      objectGroup.rotation.y = mouseX * 0.6;
      objectGroup.rotation.x = -mouseY * 0.6;

      // Scale transition based on hover state
      const currentScale = objectGroup.scale.x;
      const nextScale = currentScale + (targetScale - currentScale) * 0.12;
      objectGroup.scale.setScalar(nextScale);

      // NFC Radial Pulse effect simulation
      if (isHovered) {
        pulseTime += delta * 6;
        physicalMaterial.opacity = 0.35 + Math.sin(pulseTime) * 0.15;
      } else {
        physicalMaterial.opacity = 0.35;
      }

      // Animate particles
      const positionsArr = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        // Float particles upward
        positionsArr[i3 + 1] += speeds[i].y;
        positionsArr[i3] += speeds[i].x;
        positionsArr[i3 + 2] += speeds[i].z;

        // Reset particles if they float off screen
        if (positionsArr[i3 + 1] > 6) {
          positionsArr[i3 + 1] = -6;
          positionsArr[i3] = (Math.random() - 0.5) * 12;
          positionsArr[i3 + 2] = (Math.random() - 0.5) * 12;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Scroll interaction: synchronize model Y position with page scroll
      const scrollFraction = window.scrollY / window.innerHeight;
      // Shift down slightly on scroll
      objectGroup.position.y = -scrollFraction * 2.5;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    window.addEventListener('resize', () => {
      width = container.clientWidth;
      height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  };

  // --------------------------------------------------
  // 2. CTA WAITLIST CANVAS SCENE
  // --------------------------------------------------
  const initCtaScene = () => {
    const container = document.getElementById('cta-canvas-3d');
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const objectGroup = new THREE.Group();
    scene.add(objectGroup);

    // Large high-density icosahedron for CTA section
    const geometry = new THREE.IcosahedronGeometry(2.2, 1);
    
    // Dark glass physical material
    const physicalMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x00E5C4,          // Cyan base
      metalness: 0.95,
      roughness: 0.1,
      transparent: true,
      opacity: 0.25,
      transmission: 0.7,
      thickness: 1.5,
      side: THREE.DoubleSide
    });

    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x4F6EF7,          // Electric blue wireframe
      wireframe: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const coreMesh = new THREE.Mesh(geometry, physicalMaterial);
    const wireframeMesh = new THREE.Mesh(geometry, wireframeMaterial);
    wireframeMesh.scale.setScalar(1.002);

    // Large inner core
    const innerGeo = new THREE.IcosahedronGeometry(0.8, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xA78BFA,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);

    objectGroup.add(coreMesh);
    objectGroup.add(wireframeMesh);
    objectGroup.add(innerMesh);

    // Backdrop particle circle
    const particleCount = 150;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Ring coordinates
      const angle = Math.random() * Math.PI * 2;
      const radius = 3.5 + Math.random() * 2;
      positions[i] = Math.cos(angle) * radius;
      positions[i + 1] = Math.sin(angle) * radius;
      positions[i + 2] = (Math.random() - 0.5) * 2;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x00E5C4,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00E5C4, 3, 20);
    pointLight.position.set(0, 0, 4);
    scene.add(pointLight);

    // Interactive Hover State
    let isHovered = false;
    let targetScale = 1.0;
    let pulseTime = 0;

    container.addEventListener('mouseenter', () => {
      isHovered = true;
      targetScale = 1.12;
      wireframeMaterial.color.setHex(0x00E5C4); // Toggle colors on hover
      physicalMaterial.color.setHex(0x4F6EF7);
    });

    container.addEventListener('mouseleave', () => {
      isHovered = false;
      targetScale = 1.0;
      wireframeMaterial.color.setHex(0x4F6EF7);
      physicalMaterial.color.setHex(0x00E5C4);
    });

    // Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Core rotation
      coreMesh.rotation.x -= 0.003;
      coreMesh.rotation.y -= 0.002;
      wireframeMesh.rotation.x -= 0.003;
      wireframeMesh.rotation.y -= 0.002;
      innerMesh.rotation.z += 0.005;

      // Mouse lerping
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      // Mouse offset
      objectGroup.rotation.y = mouseX * 0.5;
      objectGroup.rotation.x = -mouseY * 0.5;

      // Scale check
      const currentScale = objectGroup.scale.x;
      const nextScale = currentScale + (targetScale - currentScale) * 0.1;
      objectGroup.scale.setScalar(nextScale);

      // Rotate particle ring
      particles.rotation.z += 0.002;

      // NFC radial blink
      if (isHovered) {
        pulseTime += delta * 8;
        physicalMaterial.opacity = 0.25 + Math.sin(pulseTime) * 0.15;
      } else {
        physicalMaterial.opacity = 0.25;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    window.addEventListener('resize', () => {
      width = container.clientWidth;
      height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  };

  // Initialize both scenes
  initHeroScene();
  initCtaScene();
});
