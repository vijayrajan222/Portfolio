'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from './useReducedMotion';

/**
 * CinematicLayer
 * ----------------
 * A transparent, full-bleed Three.js canvas that floats warm-orange and
 * white "bokeh" particles behind the hero content — the soft, dreamy,
 * movie-intro atmosphere the rest of the section sits inside.
 *
 * Implementation notes (why it's built this way):
 * - Particle drift is computed entirely in the vertex shader (uTime + a
 *   per-particle phase/speed/amplitude) so nothing is touched on the CPU
 *   per frame. With ~80 particles this is effectively free.
 * - The soft circular falloff is also procedural (no sprite texture to
 *   load/decode), drawn straight in the fragment shader.
 * - Depth-based parallax comes for free from a PerspectiveCamera: nudging
 *   the camera with the mouse makes near particles drift more than far
 *   ones, which is what gives the layer its sense of depth.
 * - An IntersectionObserver stops the render loop entirely once the hero
 *   scrolls out of view, and the loop is skipped altogether for visitors
 *   who've asked for reduced motion.
 */
export default function CinematicLayer({ className, particleCount }) {
  const canvasRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let count = particleCount;
    if (!count) {
      const width = window.innerWidth;
      count = width < 640 ? 36 : width < 1100 ? 56 : 84;
    }

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    });
    renderer.setClearColor(0x000000, 0);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(pixelRatio);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 1, 1000);
    camera.position.z = 220;

    // --- Build the particle field -----------------------------------
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    const speedsX = new Float32Array(count);
    const speedsY = new Float32Array(count);
    const ampsX = new Float32Array(count);
    const ampsY = new Float32Array(count);

    const warm = new THREE.Color('#ffb066');
    const warmDeep = new THREE.Color('#ff7a3d');
    const cool = new THREE.Color('#bfe6ff');
    const white = new THREE.Color('#fff7ec');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spread particles across a wide, deep volume so the perspective
      // camera gives a real sense of foreground/background.
      positions[i3] = (Math.random() - 0.5) * 420;
      positions[i3 + 1] = (Math.random() - 0.5) * 260;
      positions[i3 + 2] = (Math.random() - 0.5) * 320;

      // Mostly warm tones, occasional cool/white highlight for variety.
      const roll = Math.random();
      const tint = roll < 0.55 ? warm : roll < 0.8 ? warmDeep : roll < 0.92 ? white : cool;
      colors[i3] = tint.r;
      colors[i3 + 1] = tint.g;
      colors[i3 + 2] = tint.b;

      sizes[i] = 6 + Math.random() * 22;
      phases[i] = Math.random() * Math.PI * 2;
      speedsX[i] = 0.05 + Math.random() * 0.1;
      speedsY[i] = 0.04 + Math.random() * 0.09;
      ampsX[i] = 4 + Math.random() * 10;
      ampsY[i] = 6 + Math.random() * 14;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
    geometry.setAttribute('aSpeedX', new THREE.BufferAttribute(speedsX, 1));
    geometry.setAttribute('aSpeedY', new THREE.BufferAttribute(speedsY, 1));
    geometry.setAttribute('aAmpX', new THREE.BufferAttribute(ampsX, 1));
    geometry.setAttribute('aAmpY', new THREE.BufferAttribute(ampsY, 1));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: pixelRatio },
      },
      vertexShader: /* glsl */ `
        uniform float uTime;
        uniform float uPixelRatio;
        attribute float aSize;
        attribute float aPhase;
        attribute float aSpeedX;
        attribute float aSpeedY;
        attribute float aAmpX;
        attribute float aAmpY;
        attribute vec3 aColor;
        varying vec3 vColor;

        void main() {
          vColor = aColor;
          vec3 pos = position;
          pos.x += sin(uTime * aSpeedX + aPhase) * aAmpX;
          pos.y += sin(uTime * aSpeedY + aPhase * 1.7) * aAmpY;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = aSize * uPixelRatio * (260.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vColor;
        void main() {
          vec2 centered = gl_PointCoord - vec2(0.5);
          float dist = length(centered);
          float alpha = smoothstep(0.5, 0.0, dist);
          alpha *= alpha; // soften the glow falloff further
          gl_FragColor = vec4(vColor, alpha * 0.85);
        }
      `,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // --- Sizing -------------------------------------------------------
    const resize = () => {
      const { clientWidth, clientHeight } = canvas.parentElement;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / Math.max(clientHeight, 1);
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    // --- Mouse parallax -------------------------------------------------
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const handlePointerMove = (event) => {
      target.x = (event.clientX / window.innerWidth - 0.5) * 2;
      target.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!prefersReducedMotion) {
      window.addEventListener('pointermove', handlePointerMove);
    }

    // --- Pause rendering when the hero isn't visible -------------------
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas.parentElement);

    // --- Render loop ----------------------------------------------------
    let frameId;
    const clock = new THREE.Clock();
    const PARALLAX_STRENGTH = 14;

    const renderOnce = () => renderer.render(scene, camera);

    if (prefersReducedMotion) {
      renderOnce();
    } else {
      const tick = () => {
        frameId = requestAnimationFrame(tick);
        if (!isVisible) return;

        material.uniforms.uTime.value = clock.getElapsedTime();

        mouse.x += (target.x - mouse.x) * 0.04;
        mouse.y += (target.y - mouse.y) * 0.04;
        camera.position.x = mouse.x * PARALLAX_STRENGTH;
        camera.position.y = -mouse.y * PARALLAX_STRENGTH * 0.6;
        camera.lookAt(0, 0, 0);

        renderOnce();
      };
      tick();
    }

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      observer.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [particleCount, prefersReducedMotion]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
