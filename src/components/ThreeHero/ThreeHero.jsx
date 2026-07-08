/**
 * ========================================
 * ThreeHero Component
 * Purpose:
 * Displays an interactive WebGL 3D scene
 * featuring a rotating glowing energy battery
 * cell and orbital particle systems.
 *
 * Developer Notes:
 * Uses pure Three.js within a React hook
 * for optimal performance and cleanup.
 *
 * ========================================
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/* ==========================================
   THREEHERO COMPONENT
========================================== */

const ThreeHero = () => {
  const containerRef = useRef(null);
  const [charging, setCharging] = useState(false);
  const sceneRef = useRef(null);
  const particlesRef = useRef(null);
  const batteryRef = useRef(null);

  // Trigger charge pulse animation
  const handleInitiateCharge = () => {
    setCharging(true);
    setTimeout(() => setCharging(false), 2000);
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const currentContainer = containerRef.current;

    // 1. Scene, Camera, & Renderer setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Slight navy blue fog to blend background
    scene.fog = new THREE.FogExp2('#030c15', 0.05);

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.3);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight('#ffffff', 0.8);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight('#93A6C8', 2.5, 20);
    pointLight.position.set(0, -2, 2);
    scene.add(pointLight);

    // 3. Central Battery Cell Object
    const batteryGroup = new THREE.Group();
    batteryRef.current = batteryGroup;
    scene.add(batteryGroup);

    // Inner core cylinder (metallic periwinkle)
    const coreGeom = new THREE.CylinderGeometry(0.8, 0.8, 3, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: '#93A6C8',
      roughness: 0.2,
      metalness: 0.9,
      emissive: '#93A6C8',
      emissiveIntensity: 0.2
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    batteryGroup.add(coreMesh);

    // Outer glass casing
    const glassGeom = new THREE.CylinderGeometry(1.1, 1.1, 3.2, 32, 1, true);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: '#ffffff',
      transparent: true,
      opacity: 0.15,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.9,
      thickness: 0.5,
      side: THREE.DoubleSide
    });
    const glassMesh = new THREE.Mesh(glassGeom, glassMat);
    batteryGroup.add(glassMesh);

    // Caps (top & bottom metal collars)
    const capGeom = new THREE.CylinderGeometry(1.15, 1.15, 0.2, 32);
    const capMat = new THREE.MeshStandardMaterial({
      color: '#0e2949',
      roughness: 0.4,
      metalness: 0.8
    });
    
    const topCap = new THREE.Mesh(capGeom, capMat);
    topCap.position.y = 1.6;
    batteryGroup.add(topCap);

    const bottomCap = topCap.clone();
    bottomCap.position.y = -1.6;
    batteryGroup.add(bottomCap);

    // Indicator Rings (representing charge status)
    const ringGeom = new THREE.TorusGeometry(1.05, 0.04, 8, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: '#93A6C8' });
    
    const indicatorRings = [];
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = -1.2 + i * 1.2;
      batteryGroup.add(ring);
      indicatorRings.push(ring);
    }

    // 4. Orbital Particles System (Electricity flow)
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);
    const speeds = [];

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Create random points on a sphere shell surrounding the battery
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.0 + Math.random() * 2.5; // Radius between 2.0 and 4.5
      
      posArray[i] = r * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = r * Math.cos(phi);

      speeds.push({
        angle: Math.random() * Math.PI * 2,
        speed: 0.01 + Math.random() * 0.02,
        yOffset: -1.5 + Math.random() * 3,
        radius: r
      });
    }

    const particlesGeom = new THREE.BufferGeometry();
    particlesGeom.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Custom circle texture for particles
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(0,180,216,1)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
    
    const pTexture = new THREE.CanvasTexture(canvas);

    const particlesMat = new THREE.PointsMaterial({
      size: 0.18,
      map: pTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(particlesGeom, particlesMat);
    particlesRef.current = particles;
    scene.add(particles);

    // 5. Interaction variables
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) - 0.5;
      mouseY = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 6. Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Battery rotation
      batteryGroup.rotation.y = elapsedTime * 0.5;
      
      // Slight floating motion
      batteryGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.15;

      // Animate Indicator Rings
      indicatorRings.forEach((ring, index) => {
        // Rings expand slightly and pulsate intensity
        const scaleVal = 1 + Math.sin(elapsedTime * 3 + index) * 0.03;
        ring.scale.set(scaleVal, scaleVal, scaleVal);
      });

      // Animate Particles
      const positions = particlesGeom.attributes.position.array;
      for (let i = 0; i < particlesCount; i++) {
        const speedData = speeds[i];
        speedData.angle += speedData.speed;
        
        // Helix flow orbit around central column
        const xIdx = i * 3;
        const yIdx = i * 3 + 1;
        const zIdx = i * 3 + 2;
        
        positions[xIdx] = Math.cos(speedData.angle) * speedData.radius;
        positions[zIdx] = Math.sin(speedData.angle) * speedData.radius;
        
        // If charging, suck particles into the core
        if (charging) {
          positions[xIdx] *= 0.92;
          positions[zIdx] *= 0.92;
          positions[yIdx] = positions[yIdx] * 0.9 + (Math.sin(elapsedTime * 10) * 0.2) * 0.1;
        } else {
          // Slow vertical drifting
          positions[yIdx] = speedData.yOffset + Math.sin(elapsedTime + i) * 0.3;
        }
      }
      particlesGeom.attributes.position.needsUpdate = true;

      // Parallax camera movement based on mouse
      camera.position.x += (mouseX * 4 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 4 - camera.position.y) * 0.05;
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      renderer.render(scene, camera);
    };

    animate();

    // 7. Handle Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (currentContainer && renderer.domElement) {
        currentContainer.removeChild(renderer.domElement);
      }
      // Dispose materials & geometries
      coreGeom.dispose();
      coreMat.dispose();
      glassGeom.dispose();
      glassMat.dispose();
      capGeom.dispose();
      capMat.dispose();
      ringGeom.dispose();
      ringMat.dispose();
      particlesGeom.dispose();
      particlesMat.dispose();
      pTexture.dispose();
    };
  }, [charging]);

  return (
    <div className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center">
      
      {/* GL Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-auto" />

    </div>
  );
};

export default ThreeHero;
