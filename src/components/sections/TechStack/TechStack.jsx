'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import SectionHeading from '../../shared/SectionHeading';
import { useRevealAnimation } from '../../shared/useRevealAnimation';
import { techStack } from '../../../lib/data';
import styles from './TechStack.module.css';

function Node({ position, text }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Html
      position={position}
      center
      distanceFactor={950} // scales size based on distance for depth
      style={{
        transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.2s ease',
        opacity: hovered ? 1 : 0.82,
        transform: `scale(${hovered ? 1.18 : 1})`,
        pointerEvents: 'auto',
      }}
    >
      <div
        className={styles.nodeBadge}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <span className={styles.nodeDot} />
        {text}
      </div>
    </Html>
  );
}

function SphereCloud({ items, radius = 5 }) {
  const groupRef = useRef();

  useFrame(() => {
    if (!groupRef.current) return;
    // Slow continuous drift rotation
    groupRef.current.rotation.y += 0.0025;
    groupRef.current.rotation.x += 0.001;
  });

  const count = items.length;

  return (
    <group ref={groupRef}>
      {items.map((item, index) => {
        // Fibonacci sphere point distribution
        const phi = Math.acos(-1 + (2 * index) / count);
        const theta = Math.sqrt(count * Math.PI) * phi;
        
        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(phi);

        return (
          <Node key={item} position={[x, y, z]} text={item} />
        );
      })}
    </group>
  );
}

export default function TechStack() {
  const sectionRef = useRef(null);
  useRevealAnimation(sectionRef);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let active = true;
    requestAnimationFrame(() => {
      if (active) setMounted(true);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section ref={sectionRef} id="tech-stack" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Interactive 3D Constellation"
          align="center"
        />

        <div className={`${styles.canvasContainer} reveal`}>
          {mounted ? (
            <Canvas camera={{ position: [0, 0, 11], fov: 60 }} dpr={[1, 2]}>
              <ambientLight intensity={1.5} />
              <pointLight position={[10, 10, 10]} intensity={1.5} />
              <SphereCloud items={techStack} radius={4.5} />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                maxPolarAngle={Math.PI / 2 + 0.5}
                minPolarAngle={Math.PI / 2 - 0.5}
              />
            </Canvas>
          ) : (
            <div className={styles.loadingPlaceholder}>
              <div className={styles.spinner} />
              <span>Initializing 3D Constellation...</span>
            </div>
          )}

          <div className={styles.canvasInstructions}>
            Drag to rotate &middot; Hover to inspect
          </div>
        </div>
      </div>
    </section>
  );
}
