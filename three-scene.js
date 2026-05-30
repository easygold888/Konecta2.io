// ----------------------------------------------------
// THREE.JS 3D SCENE SETUPS (Revamped Color Systems)
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  if (typeof THREE === 'undefined') {
    console.error('Three.js failed to load via CDN.');
    return;
  }

  // Common tracking mouse coordinates
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;

  window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
    targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // --------------------------------------------------
  // 1. HERO CANVAS SCENE (Electric Blue & Neon Cyan)
  // --------------------------------------------------
  const initHeroScene = () => {
    const container = document.getElementById('canvas-3d');
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();

    // Perspective Camera (Spherical view)
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const objectGroup = new THREE.Group();
    scene.add(objectGroup);

    // Geodesic icosahedron
    const geometry = new THREE.IcosahedronGeometry(2, 1);
    
    // Core physical translucent material in 70-20-10 palette colors (Royal blue base)
    const physicalMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1E3EC4,          // Royal electric blue
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.3,
      transmission: 0.7,        // Glass refracted light depth
      thickness: 1.3,
      side: THREE.DoubleSide
    });

    // Glowing neon wireframe overlay
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00FFDB,          // Neon Cyan
      wireframe: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const coreMesh = new THREE.Mesh(geometry, physicalMaterial);
    const wireframeMesh = new THREE.Mesh(geometry, wireframeMaterial);
    wireframeMesh.scale.setScalar(1.002); // Avoid visual overlap z-fight

    // Glowing inner sphere
    const innerGeo = new THREE.SphereGeometry(0.7, 16, 16);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xA78BFA,          // Soft violet core
      transparent: true,
      opacity: 0.65
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);

    objectGroup.add(coreMesh);
    objectGroup.add(wireframeMesh);
    objectGroup.add(innerMesh);

    // Particles system
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = [];

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 12;
      positions[i + 1] = (Math.random() - 0.5) * 12;
      positions[i + 2] = (Math.random() - 0.5) * 12;

      speeds.push({
        x: (Math.random() - 0.5) * 0.004,
        y: Math.random() * 0.008 + 0.002,
        z: (Math.random() - 0.5) * 0.004
      });
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xA78BFA,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x1E3EC4, 2.5, 20);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00FFDB, 2, 20);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Interactive Hover States
    let isHovered = false;
    let targetScale = 1.0;
    let pulseTime = 0;

    container.addEventListener('mouseenter', () => {
      isHovered = true;
      targetScale = 1.15;
      wireframeMaterial.color.setHex(0xFFFFFF); // White glow
    });

    container.addEventListener('mouseleave', () => {
      isHovered = false;
      targetScale = 1.0;
      wireframeMaterial.color.setHex(0x00FFDB); // Reset neon cyan
    });

    // Frame Loop
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Core rotation
      coreMesh.rotation.x += 0.002;
      coreMesh.rotation.y += 0.003;
      wireframeMesh.rotation.x += 0.002;
      wireframeMesh.rotation.y += 0.003;

      // Inner sphere pulse
      const innerScaleVal = 1.0 + Math.sin(elapsedTime * 3) * 0.12;
      innerMesh.scale.setScalar(innerScaleVal);

      // Lerp mouse coordinates
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      objectGroup.rotation.y = mouseX * 0.5;
      objectGroup.rotation.x = -mouseY * 0.5;

      // Scale transition
      const currentScale = objectGroup.scale.x;
      const nextScale = currentScale + (targetScale - currentScale) * 0.12;
      objectGroup.scale.setScalar(nextScale);

      // Radial hover signal pulse
      if (isHovered) {
        pulseTime += delta * 6;
        physicalMaterial.opacity = 0.3 + Math.sin(pulseTime) * 0.12;
      } else {
        physicalMaterial.opacity = 0.3;
      }

      // Animate particles
      const positionsArr = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positionsArr[i3 + 1] += speeds[i].y;
        positionsArr[i3] += speeds[i].x;
        positionsArr[i3 + 2] += speeds[i].z;

        // Reset if drifted away
        if (positionsArr[i3 + 1] > 6) {
          positionsArr[i3 + 1] = -6;
          positionsArr[i3] = (Math.random() - 0.5) * 12;
          positionsArr[i3 + 2] = (Math.random() - 0.5) * 12;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Scroll transition
      const scrollFraction = window.scrollY / window.innerHeight;
      objectGroup.position.y = -scrollFraction * 2.2;

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
  // 2. CTA WAITLIST CANVAS SCENE (Contrast Dark Style)
  // --------------------------------------------------
  const initCtaScene = () => {
    const container = document.getElementById('cta-canvas-3d');
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const objectGroup = new THREE.Group();
    scene.add(objectGroup);

    const geometry = new THREE.IcosahedronGeometry(2.2, 1);
    
    // Physical cyan glass material
    const physicalMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x00FFDB,          // Cyan highlights
      metalness: 0.95,
      roughness: 0.1,
      transparent: true,
      opacity: 0.25,
      transmission: 0.75,
      thickness: 1.5,
      side: THREE.DoubleSide
    });

    // Royal blue wireframe
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x1E3EC4,          // Royal blue
      wireframe: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const coreMesh = new THREE.Mesh(geometry, physicalMaterial);
    const wireframeMesh = new THREE.Mesh(geometry, wireframeMaterial);
    wireframeMesh.scale.setScalar(1.002);

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

    // Particle Ring
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 3.2 + Math.random() * 1.8;
      positions[i] = Math.cos(angle) * radius;
      positions[i + 1] = Math.sin(angle) * radius;
      positions[i + 2] = (Math.random() - 0.5) * 1.5;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x00FFDB,
      size: 0.04,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00FFDB, 3, 20);
    pointLight.position.set(0, 0, 4);
    scene.add(pointLight);

    // Interactive Hover States
    let isHovered = false;
    let targetScale = 1.0;
    let pulseTime = 0;

    container.addEventListener('mouseenter', () => {
      isHovered = true;
      targetScale = 1.12;
      wireframeMaterial.color.setHex(0x00FFDB); // Reverse cyan/royal
      physicalMaterial.color.setHex(0x1E3EC4);
    });

    container.addEventListener('mouseleave', () => {
      isHovered = false;
      targetScale = 1.0;
      wireframeMaterial.color.setHex(0x1E3EC4);
      physicalMaterial.color.setHex(0x00FFDB);
    });

    // Frame loop
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Rotations
      coreMesh.rotation.x -= 0.003;
      coreMesh.rotation.y -= 0.002;
      wireframeMesh.rotation.x -= 0.003;
      wireframeMesh.rotation.y -= 0.002;
      innerMesh.rotation.z += 0.004;

      // Mouse lerping
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      objectGroup.rotation.y = mouseX * 0.4;
      objectGroup.rotation.x = -mouseY * 0.4;

      // Scale
      const currentScale = objectGroup.scale.x;
      const nextScale = currentScale + (targetScale - currentScale) * 0.1;
      objectGroup.scale.setScalar(nextScale);

      // Rotate particle ring
      particles.rotation.z += 0.002;

      // Blink pulse
      if (isHovered) {
        pulseTime += delta * 8;
        physicalMaterial.opacity = 0.25 + Math.sin(pulseTime) * 0.12;
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

  // Initialize Scenes
  initHeroScene();
  initCtaScene();
});
