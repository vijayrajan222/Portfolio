'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '../../shared/SectionHeading';
import { useRevealAnimation } from '../../shared/useRevealAnimation';
import { useReducedMotion } from '../../VideoIntro/useReducedMotion';
import { skillCategories } from '../../../lib/data';
import styles from './Skills.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Skills() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  useRevealAnimation(sectionRef, '.reveal', { stagger: 0.08 });

  useEffect(() => {
    if (!sectionRef.current) return;
    const bars = sectionRef.current.querySelectorAll('.skill-bar');
    if (!bars.length) return;

    if (prefersReducedMotion) {
      bars.forEach((bar) => {
        bar.style.width = bar.style.getPropertyValue('--level');
      });
      return;
    }

    const ctx = gsap.context(() => {
      bars.forEach((bar) => {
        const level = bar.style.getPropertyValue('--level');
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: level,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: bar, start: 'top 92%', once: true },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} id="skills" className="section section--alt">
      <div className="container">
        <SectionHeading
          eyebrow="Technical Skills"
          title="What I actually work with"
          description="Categorized by where it sits in the stack, with a rough self-assessment of how deep each one runs."
        />

        <div className={styles.grid}>
          {skillCategories.map((group) => (
            <div key={group.category} className={`${styles.card} reveal`}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{group.category}</h3>
                <p className={styles.cardBlurb}>{group.blurb}</p>
              </div>

              <ul className={styles.skillList}>
                {group.skills.map((skill) => (
                  <li key={skill.name} className={styles.skillRow}>
                    <div className={styles.skillTop}>
                      <span className={styles.skillName}>{skill.name}</span>
                      <span className={styles.skillLevel}>{skill.level}%</span>
                    </div>
                    <div className={styles.barTrack}>
                      <div
                        className={`${styles.barFill} skill-bar`}
                        style={{ '--level': `${skill.level}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
