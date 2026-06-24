// ----------------------------------------------------
// THREE.JS UNIFIED FULL-SCREEN WEBGL STORYTELLING CORE
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  if (typeof THREE === 'undefined') {
    console.error('Three.js failed to load. Storytelling Space unavailable.');
    return;
  }

  const container = document.getElementById('canvas-3d');
  if (!container) return;

  let width = window.innerWidth;
  let height = window.innerHeight;

  const scene = new THREE.Scene();

  // Perspective Camera for deep volumetric space depth
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0, 6.5); // Resting Hero camera distance
  window.heroCamera = camera;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // --------------------------------------------------
  // 1. MODELING THE HOLOGRAPHIC 3D NFC PLAQUE (CARD)
  // --------------------------------------------------
  const objectGroup = new THREE.Group();
  scene.add(objectGroup);
  window.heroObjectGroup = objectGroup;

  // Bevelled metallic dark blue physical glass plate
  const cardGeo = new THREE.BoxGeometry(2.4, 1.48, 0.08);
  const cardMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,          // Frosted light glass
    metalness: 0.1,
    roughness: 0.1,
    transparent: true,
    opacity: 0.5,
    transmission: 0.9,       // Refraction depth
    thickness: 1.2,
    roughnessMap: null,
    clearcoat: 1.0,           // Gloss reflection layer
    clearcoatRoughness: 0.05,
    side: THREE.DoubleSide
  });
  const cardMesh = new THREE.Mesh(cardGeo, cardMat);
  objectGroup.add(cardMesh);

  // Golden NFC Microchip
  const chipGeo = new THREE.BoxGeometry(0.35, 0.3, 0.015);
  const chipMat = new THREE.MeshPhysicalMaterial({
    color: 0xDDA520,          // Golden reflect
    metalness: 0.95,
    roughness: 0.15,
    clearcoat: 0.8
  });
  const chipMesh = new THREE.Mesh(chipGeo, chipMat);
  chipMesh.position.set(-0.7, 0.2, 0.045); // Left-center chip placement
  objectGroup.add(chipMesh);

  // Holographic neon cyan wireframe overlay
  const wireframeMat = new THREE.MeshBasicMaterial({
    color: 0x7C8BE7,          // Periwinkle
    wireframe: true,
    transparent: true,
    opacity: 0.6,
    blending: THREE.NormalBlending
  });
  const wireframeMesh = new THREE.Mesh(cardGeo, wireframeMat);
  wireframeMesh.scale.setScalar(1.004); // Avoid z-fighting z-overlap
  objectGroup.add(wireframeMesh);

  // Pulsing Electromagnetic NFC wireless rings group
  const nfcRingsGroup = new THREE.Group();
  nfcRingsGroup.position.set(-0.7, 0.2, 0.05); // Centered over chip
  objectGroup.add(nfcRingsGroup);
  window.heroNfcRings = nfcRingsGroup;

  const ringCount = 3;
  const rings = [];
  for (let i = 0; i < ringCount; i++) {
    const ringGeo = new THREE.RingGeometry(0.18 * (i + 1), 0.18 * (i + 1) + 0.012, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x82C2A5,        // Sage Green
      transparent: true,
      opacity: 0.85 - (i * 0.22),
      side: THREE.DoubleSide,
      blending: THREE.NormalBlending
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    nfcRingsGroup.add(ringMesh);
    rings.push({
      mesh: ringMesh,
      baseScale: i * 0.4 + 1.0,
      speed: 1.5 + (i * 0.2)
    });
  }

  // --------------------------------------------------
  // 2. VOLUMETRIC SPACE PARTICLES SYSTEM (Background Starfield)
  // --------------------------------------------------
  const particleCount = 420;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const speeds = [];

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 16;
    positions[i + 1] = (Math.random() - 0.5) * 16;
    positions[i + 2] = (Math.random() - 0.5) * 16;

    speeds.push({
      x: (Math.random() - 0.5) * 0.003,
      y: Math.random() * 0.006 + 0.002, // Drift downwards
      z: (Math.random() - 0.5) * 0.003
    });
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particleMat = new THREE.PointsMaterial({
    color: 0x7C8BE7,          // Soft Periwinkle particles
    size: 0.045,
    transparent: true,
    opacity: 0.35,
    blending: THREE.NormalBlending
  });
  window.heroParticleMat = particleMat;

  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);
  window.heroParticles = particles;

  // --------------------------------------------------
  // 3. SCI-FI LIGHTING ENVIRONMENTS
  // --------------------------------------------------
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.75); // Brighter ambient for light theme
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
  keyLight.position.set(5, 8, 5);
  scene.add(keyLight);

  const sageLight = new THREE.PointLight(0x82C2A5, 3.0, 15); // Sage Green Point Light
  sageLight.position.set(-4, -4, 4);
  scene.add(sageLight);

  const lilacLight = new THREE.PointLight(0xD1C4E9, 4.0, 15); // Soft Lilac Point Light
  lilacLight.position.set(4, 4, 4);
  scene.add(lilacLight);

  // Mouse tilt panning references
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;

  window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
    targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // Device orientation / gyroscope support for mobile immersion!
  window.addEventListener('deviceorientation', (e) => {
    if (e.gamma !== null && e.beta !== null) {
      targetMouseX = Math.min(1, Math.max(-1, e.gamma / 30));
      targetMouseY = Math.min(1, Math.max(-1, (e.beta - 45) / 30));
    }
  });

  // --------------------------------------------------
  // 4. ANIMATION FRAME TICK LOOP
  // --------------------------------------------------
  const clock = new THREE.Clock();

  const animate = () => {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();
    const delta = clock.getDelta();

    // 1. Electromagnetic NFC rings wave pulse animation
    rings.forEach(ring => {
      let scaleVal = 1.0 + ((elapsedTime * ring.speed) % 1.5);
      ring.mesh.scale.setScalar(scaleVal);
      ring.mesh.material.opacity = Math.max(0, 0.85 - (scaleVal / 2.5));
    });

    // 2. Slow base card floating drift rotation
    cardMesh.position.y = Math.sin(elapsedTime * 1.5) * 0.06;
    wireframeMesh.position.y = cardMesh.position.y;
    chipMesh.position.y = 0.2 + cardMesh.position.y;
    nfcRingsGroup.position.y = 0.2 + cardMesh.position.y;

    // 3. Smooth mouse tilt interpolation with inertia
    mouseX += (targetMouseX - mouseX) * 0.08;
    mouseY += (targetMouseY - mouseY) * 0.08;

    objectGroup.rotation.y = mouseX * 0.38 + (elapsedTime * 0.06); // slowly orbits over time
    objectGroup.rotation.x = -mouseY * 0.38;

    // 4. Starfield cosmic particles drift
    const positionsArr = particleGeo.attributes.position.array;
    let speedMult = window.starSpeedMultiplier || 1.0;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positionsArr[i3 + 1] -= speeds[i].y * speedMult; // drift down
      positionsArr[i3] += speeds[i].x * (speedMult * 0.2);
      positionsArr[i3 + 2] += speeds[i].z * (speedMult * 0.2);

      // Reset coordinates if traveled past bounds
      if (positionsArr[i3 + 1] < -8) {
        positionsArr[i3 + 1] = 8;
        positionsArr[i3] = (Math.random() - 0.5) * 16;
        positionsArr[i3 + 2] = (Math.random() - 0.5) * 16;
      }
    }
    particleGeo.attributes.position.needsUpdate = true;

    // Slow revolve the background constellation
    particles.rotation.z += 0.0006 * speedMult;

    renderer.render(scene, camera);
  };

  animate();

  // --------------------------------------------------
  // 5. RESIZING WINDOW BOUNDS CONTROLLER
  // --------------------------------------------------
  window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // Expose global triggers for events (shockwaves)
  window.triggerHeroCinematicTransition = () => {
    if (!objectGroup || !camera) return;

    // Double-spin rotation loop
    gsap.to(objectGroup.rotation, {
      y: objectGroup.rotation.y + Math.PI * 2,
      x: objectGroup.rotation.x + Math.PI,
      duration: 2.2,
      ease: 'power3.inOut'
    });

    // Camera zoom-in and return
    gsap.timeline()
      .to(camera.position, {
        z: 4.0,
        duration: 1.0,
        ease: 'power2.inOut'
      })
      .to(camera.position, {
        z: 6.5,
        duration: 1.5,
        ease: 'power3.out'
      });

    // Explosive white glow on wireframe card
    wireframeMat.color.setHex(0xffffff);
    gsap.to(objectGroup.scale, {
      x: 1.35,
      y: 1.35,
      z: 1.35,
      duration: 0.9,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        wireframeMat.color.setHex(0x7C8BE7);
      }
    });
  };
});
