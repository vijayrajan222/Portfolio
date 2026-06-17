'use client';

import { useRef } from 'react';
import SectionHeading from '../../shared/SectionHeading';
import { useRevealAnimation } from '../../shared/useRevealAnimation';
import { techStack } from '../../../lib/data';
import styles from './TechStack.module.css';

/**
 * A quicker, more visual companion to the Technical Skills breakdown:
 * two rows of badges drifting in opposite directions (pure CSS marquee,
 * no JS animation loop needed — cheap and seamless).
 */
export default function TechStack() {
  const sectionRef = useRef(null);
  useRevealAnimation(sectionRef);

  const rowA = [...techStack, ...techStack];
  const rowB = [...techStack.slice().reverse(), ...techStack.slice().reverse()];

  return (
    <section ref={sectionRef} id="tech-stack" className="section">
      <div className="container">
        <SectionHeading eyebrow="Tech Stack" title="Tools I reach for" align="center" />
      </div>

      <div className={`${styles.marqueeWrap} reveal`}>
        <div className={styles.fadeLeft} />
        <div className={styles.fadeRight} />

        <div className={styles.row}>
          <div className={styles.track + ' ' + styles.trackLeft}>
            {rowA.map((tech, i) => (
              <span key={tech + i} className={styles.badge}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.track + ' ' + styles.trackRight}>
            {rowB.map((tech, i) => (
              <span key={tech + i} className={styles.badge}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
