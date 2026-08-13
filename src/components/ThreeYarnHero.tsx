import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeYarnHeroProps {
  className?: string;
}

export const ThreeYarnHero: React.FC<ThreeYarnHeroProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    let renderer: THREE.WebGLRenderer | null = null;

    try {
      // WebGL support check
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }

      const width = container.clientWidth || 300;
      const height = container.clientHeight || 300;

      // Scene, Camera, Renderer
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0xFAF7F2, 0.08);

      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 0, 7);

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.shadowMap.enabled = true;
      container.appendChild(renderer.domElement);

      // Warm Ambient and Directional Lighting
      const ambientLight = new THREE.AmbientLight(0xFFF9F0, 1.2);
      scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight(0xE8C4C4, 1.5);
      dirLight.position.set(5, 8, 5);
      scene.add(dirLight);

      const pointLight = new THREE.PointLight(0x87CEEB, 1.2, 10);
      pointLight.position.set(-4, -2, 3);
      scene.add(pointLight);

      // Determine performance level (mobile vs desktop)
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

      // Soft Pastel Colors for Yarn/Threads
      const pastelColors = [
        0xE8C4C4, // Muted Rose / Pink
        0x87CEEB, // Sky Blue
        0xC5D5C1, // Light Sage
        0xEFEAD8, // Warm Cream
        0xB8866B  // Terracotta / Soft Brown
      ];

      const objectsGroup = new THREE.Group();
      scene.add(objectsGroup);

      // 1. Floating Yarn Balls (Positioned strictly on outer left/right margins)
      const yarnGeom = new THREE.SphereGeometry(0.4, 32, 32);
      const yarnBalls: THREE.Mesh[] = [];

      for (let i = 0; i < (isMobile ? 3 : 6); i++) {
        const col = pastelColors[i % pastelColors.length];
        const mat = new THREE.MeshStandardMaterial({
          color: col,
          roughness: 0.85,
          metalness: 0.05,
          wireframe: i % 2 === 1
        });

        const mesh = new THREE.Mesh(yarnGeom, mat);
        // Position strictly on left (x <= -3) or right (x >= 3) to keep center clear
        const isRightSide = i % 2 === 0;
        const xPos = isRightSide ? (2.8 + Math.random() * 2) : (-2.8 - Math.random() * 2);
        mesh.position.set(
          xPos,
          (Math.random() - 0.5) * (isMobile ? 3 : 4.5),
          -1.5 - Math.random() * 1.5
        );
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        const scale = 0.4 + Math.random() * 0.35;
        mesh.scale.set(scale, scale, scale);

        yarnBalls.push(mesh);
        objectsGroup.add(mesh);
      }

      // 2. Crochet Loops / Torus Knots (Positioned on outer edges)
      const torusGeom = new THREE.TorusKnotGeometry(0.3, 0.09, 64, 16);
      const torusKnots: THREE.Mesh[] = [];

      for (let i = 0; i < (isMobile ? 2 : 4); i++) {
        const col = pastelColors[(i + 2) % pastelColors.length];
        const mat = new THREE.MeshStandardMaterial({
          color: col,
          roughness: 0.7,
          metalness: 0.1
        });

        const mesh = new THREE.Mesh(torusGeom, mat);
        const isRightSide = i % 2 === 1;
        const xPos = isRightSide ? (3.2 + Math.random() * 1.8) : (-3.2 - Math.random() * 1.8);
        mesh.position.set(
          xPos,
          (Math.random() - 0.5) * 4,
          -2 - Math.random() * 1.5
        );
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        mesh.scale.setScalar(0.3 + Math.random() * 0.2);

        torusKnots.push(mesh);
        objectsGroup.add(mesh);
      }

      // 4. Soft Floating Fiber Particles
      const particleCount = isMobile ? 30 : 70;
      const particlesGeom = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        particlePositions[i * 3] = (Math.random() - 0.5) * 10;
        particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
        particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      }

      particlesGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      const particleMat = new THREE.PointsMaterial({
        color: 0xD8C0B0,
        size: 0.06,
        transparent: true,
        opacity: 0.6
      });
      const particleSystem = new THREE.Points(particlesGeom, particleMat);
      scene.add(particleSystem);

      // Mouse Parallax Effect
      let mouseX = 0;
      let mouseY = 0;
      let targetMouseX = 0;
      let targetMouseY = 0;

      const handleMouseMove = (e: MouseEvent) => {
        targetMouseX = (e.clientX / window.innerWidth - 0.5) * 0.8;
        targetMouseY = (e.clientY / window.innerHeight - 0.5) * 0.8;
      };

      if (!isMobile) {
        window.addEventListener('mousemove', handleMouseMove);
      }

      // Window Resize
      const handleResize = () => {
        if (!container || !renderer) return;
        const w = container.clientWidth || 300;
        const h = container.clientHeight || 300;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener('resize', handleResize);

      // Animation Loop
      let clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        // Smooth Mouse Interpolation
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;

        objectsGroup.rotation.y = mouseX * 0.6 + Math.sin(elapsedTime * 0.2) * 0.05;
        objectsGroup.rotation.x = -mouseY * 0.6 + Math.cos(elapsedTime * 0.15) * 0.05;

        yarnBalls.forEach((ball, idx) => {
          ball.position.y += Math.sin(elapsedTime * 1.2 + idx) * 0.0025;
          ball.rotation.x += 0.004;
          ball.rotation.y += 0.006;
        });

        torusKnots.forEach((knot, idx) => {
          knot.position.y += Math.cos(elapsedTime * 0.9 + idx) * 0.002;
          knot.rotation.x += 0.005;
          knot.rotation.z += 0.003;
        });

        particleSystem.rotation.y = elapsedTime * 0.02;

        if (renderer) {
          renderer.render(scene, camera);
        }
      };

      animate();

      return () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);

        if (container && renderer && renderer.domElement) {
          try {
            container.removeChild(renderer.domElement);
          } catch {}
        }
        if (renderer) {
          renderer.dispose();
        }
      };
    } catch (err) {
      console.warn('Three.js initialization skipped:', err);
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported) {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-[#FAF7F2] via-[#F4ECE1] to-[#EFEAD8] ${className}`}>
        <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" />
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#E8C4C4]/30 rounded-full blur-3xl animate-soft-pulse" />
        <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-[#87CEEB]/20 rounded-full blur-3xl animate-soft-pulse" />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden pointer-events-none ${className}`}>
      <div ref={mountRef} className="w-full h-full min-h-[300px]" />
    </div>
  );
};
