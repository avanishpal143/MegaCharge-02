/**
 * ========================================
 * NetworkGlobe Component
 * Purpose:
 * Renders an interactive 3D particle sphere
 * representing the national charging network.
 *
 * Developer Notes:
 * Integrates procedural sphere geometries
 * and standard Three.js canvas lifecycles.
 *
 * ========================================
 */

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* ==========================================
   NETWORKGLOBE COMPONENT
========================================== */

const NetworkGlobe = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const currentContainer = containerRef.current;

    // 1. Setup Scene, Camera, & Renderer
    const scene = new THREE.Scene();
    
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 2. Add Globe Wireframe
    const globeGeom = new THREE.SphereGeometry(2, 24, 24);
    const globeMat = new THREE.MeshBasicMaterial({
      color: '#0e2949',
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const globeMesh = new THREE.Mesh(globeGeom, globeMat);
    scene.add(globeMesh);

    // 3. Add Core Glow Sphere
    const coreGeom = new THREE.SphereGeometry(1.9, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({
      color: '#0A2540',
      transparent: true,
      opacity: 0.4
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    scene.add(coreMesh);

    // 4. Add Glowing Hotspot Nodes on Sphere Surface
    const hotspotsGroup = new THREE.Group();
    scene.add(hotspotsGroup);

    // Node locations (Spherical coordinates representing India corridor spread)
    const cities = [
      { lat: 20, lon: 78, name: 'Central India Hub' },
      { lat: 28.6, lon: 77.2, name: 'Delhi NCR Hub' },
      { lat: 19.07, lon: 72.87, name: 'Mumbai Corridor' },
      { lat: 12.97, lon: 77.59, name: 'Bengaluru Grid' },
      { lat: 13.08, lon: 80.27, name: 'Chennai Expressway' },
      { lat: 17.38, lon: 78.48, name: 'Hyderabad Ring' },
      { lat: 22.57, lon: 88.36, name: 'Kolkata Sector V' }
    ];

    const nodeGeom = new THREE.SphereGeometry(0.06, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({
      color: '#1DB954',
      transparent: true,
      opacity: 0.9
    });

    const conversionRadius = 2.0;

    cities.forEach(city => {
      const phi = (90 - city.lat) * (Math.PI / 180);
      const theta = (city.lon + 180) * (Math.PI / 180);

      const x = -(conversionRadius * Math.sin(phi) * Math.sin(theta));
      const y = conversionRadius * Math.cos(phi);
      const z = conversionRadius * Math.sin(phi) * Math.cos(theta);

      const nodeMesh = new THREE.Mesh(nodeGeom, nodeMat);
      nodeMesh.position.set(x, y, z);
      hotspotsGroup.add(nodeMesh);

      // Add a small pulsating ring around each node
      const ringGeom = new THREE.RingGeometry(0.08, 0.12, 16);
      const ringMat = new THREE.MeshBasicMaterial({
        color: '#1DB954',
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.position.set(x, y, z);
      
      // Orient ring to align with sphere normal
      const normalVec = new THREE.Vector3(x, y, z).normalize();
      ringMesh.lookAt(normalVec.add(ringMesh.position));
      hotspotsGroup.add(ringMesh);
    });

    // 5. Add Orbital Grid Ring
    const outerRingGeom = new THREE.RingGeometry(2.6, 2.65, 64);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: '#F18321',
      side: THREE.DoubleSide
    });
    const outerRing = new THREE.Mesh(outerRingGeom, outerRingMat);
    outerRing.rotation.x = Math.PI / 2.3;
    scene.add(outerRing);

    // 6. Interaction variables
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) - 0.5;
      mouseY = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 7. Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Slow rotation of globe and hotspots together
      globeMesh.rotation.y = elapsedTime * 0.15;
      hotspotsGroup.rotation.y = elapsedTime * 0.15;
      
      // Slight counter-rotation of grid lines
      outerRing.rotation.z = -elapsedTime * 0.05;

      // Mouse drag parallax
      scene.rotation.y += (mouseX * 0.5 - scene.rotation.y) * 0.05;
      scene.rotation.x += (mouseY * 0.5 - scene.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Handle Resize
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
      globeGeom.dispose();
      globeMat.dispose();
      coreGeom.dispose();
      coreMat.dispose();
      nodeGeom.dispose();
      nodeMat.dispose();
      outerRingGeom.dispose();
      outerRingMat.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center bg-megacharge-card border border-megacharge-border rounded-3xl overflow-hidden">
      
      {/* GL Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-auto" />
      
      {/* Decorative Text */}
      <div className="absolute top-6 left-6 z-10">
        <span className="text-megacharge-green text-[10px] font-bold uppercase tracking-wider block mb-1">
          Active Grid Monitored
        </span>
        <h4 className="text-white font-bold text-sm">MegaCharge Cloud CPO Globe</h4>
      </div>

      <div className="absolute bottom-6 right-6 z-10 text-[9px] font-mono text-megacharge-text-secondary text-right">
        NODE METRIC: <span className="text-megacharge-green">99.8% UPTIME</span>
        <br />
        SYNC STATE: <span className="text-megacharge-green">OCPP LIVE</span>
      </div>

    </div>
  );
};

export default NetworkGlobe;
