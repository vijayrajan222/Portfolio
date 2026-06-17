'use client';

import { useRef } from 'react';
import SectionHeading from '../../shared/SectionHeading';
import { useRevealAnimation } from '../../shared/useRevealAnimation';
import { skillCategories } from '../../../lib/data';
import styles from './Skills.module.css';

export default function Skills() {
  const sectionRef = useRef(null);
  useRevealAnimation(sectionRef);

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
                  <div key={skill} className={styles.badge}>
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
