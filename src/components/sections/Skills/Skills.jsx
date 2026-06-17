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

  // Map existing categories from data.js into the requested 5 categories
  const groupedSkills = [
    {
      category: 'Languages',
      blurb: 'Core programming languages.',
      skills: skillCategories.find(c => c.category === 'Languages')?.skills.map(s => s.name) || []
    },
    {
      category: 'Frontend',
      blurb: 'Creating sleek, interactive interfaces.',
      skills: skillCategories.find(c => c.category === 'Frontend')?.skills.map(s => s.name) || []
    },
    {
      category: 'Backend',
      blurb: 'Designing APIs and robust server logic.',
      skills: skillCategories.find(c => c.category === 'Backend')?.skills.map(s => s.name) || []
    },
    {
      category: 'Database',
      blurb: 'Data modeling and storage.',
      skills: skillCategories.find(c => c.category.includes('Database'))?.skills.map(s => s.name) || []
    },
    {
      category: 'Tools & Platforms',
      blurb: 'Cloud, version control, and development environments.',
      skills: [
        ...(skillCategories.find(c => c.category.includes('Cloud'))?.skills.map(s => s.name) || []),
        ...(skillCategories.find(c => c.category.includes('Tools'))?.skills.map(s => s.name) || []),
        ...(skillCategories.find(c => c.category.includes('Foundations'))?.skills.map(s => s.name) || []),
      ]
    }
  ];

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const badges = sectionRef.current.querySelectorAll('.skill-badge');
      gsap.fromTo(
        badges,
        { scale: 0.8, opacity: 0, y: 15 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
          stagger: {
            each: 0.02,
            grid: 'auto',
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} id="skills" className="section section--alt">
      <div className="container">
        <SectionHeading
          eyebrow="Technical Skills"
          title="My Core Capabilities"
          description="A single unified breakdown of the technologies I use to build scalable web applications."
        />

        <div className={styles.grid}>
          {groupedSkills.map((group) => (
            <div key={group.category} className={`${styles.card} reveal`}>
              <div className={styles.cardHeader}>
                <div className={styles.categoryBadge} />
                <h3 className={styles.cardTitle}>{group.category}</h3>
                <p className={styles.cardBlurb}>{group.blurb}</p>
              </div>

              <div className={styles.badgeContainer}>
                {group.skills.map((skill) => (
                  <div key={skill} className={`${styles.badge} skill-badge`}>
                    <span className={styles.badgeGlow} />
                    <span className={styles.badgeText}>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
