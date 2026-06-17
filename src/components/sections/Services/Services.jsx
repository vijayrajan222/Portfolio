'use client';

import { useRef } from 'react';
import SectionHeading from '../../shared/SectionHeading';
import { useRevealAnimation } from '../../shared/useRevealAnimation';
import { services } from '../../../lib/data';
import styles from './Services.module.css';

export default function Services() {
  const sectionRef = useRef(null);
  useRevealAnimation(sectionRef, '.reveal', { stagger: 0.08 });

  return (
    <section ref={sectionRef} id="services" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Services"
          title="What I can build for you"
          description="Suggested based on the stack and projects above — edit freely to match what you actually want to take on."
        />

        <div className={styles.grid}>
          {services.map((service, i) => (
            <div key={service.title} className={`${styles.card} reveal`}>
              <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
              <h3 className={styles.title}>{service.title}</h3>
              <p className={styles.description}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
