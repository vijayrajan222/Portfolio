'use client';

import { useRef } from 'react';
import SectionHeading from '../../shared/SectionHeading';
import { useRevealAnimation } from '../../shared/useRevealAnimation';
import { profile, aboutFacts, education, languages } from '../../../lib/data';
import styles from './About.module.css';

export default function About() {
  const sectionRef = useRef(null);
  useRevealAnimation(sectionRef);

  return (
    <section ref={sectionRef} id="about" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="About Me"
          title="The developer behind the screen"
          description="A quick look at how I got here, and what I actually spend my time doing."
        />

        <div className={styles.grid}>
          <div className={`${styles.summary} reveal`}>
            <p className={styles.lead}>{profile.summary}</p>
            <p className={styles.body}>
              Outside of feature work, I spend a lot of time on the fundamentals — data structures,
              algorithms, and object-oriented design — because they're what make the difference between
              code that works today and code that's still maintainable a year from now. I also mentor
              junior trainees, which keeps me honest about explaining the &ldquo;why&rdquo; behind a
              decision, not just the &ldquo;how&rdquo;.
            </p>

            <div className={styles.languages}>
              <span className={styles.languagesLabel}>Languages I speak</span>
              <div className={styles.languageChips}>
                {languages.map((lang) => (
                  <span key={lang} className={styles.languageChip}>
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={`${styles.factCard} reveal`}>
            <ul className={styles.factList}>
              {aboutFacts.map((fact) => (
                <li key={fact.label} className={styles.factRow}>
                  <span className={styles.factLabel}>{fact.label}</span>
                  <span className={styles.factValue}>{fact.value}</span>
                </li>
              ))}
            </ul>

            <div className={styles.educationBlock}>
              <span className={styles.educationLabel}>Education</span>
              <p className={styles.educationDegree}>{education.degree}</p>
              <p className={styles.educationSchool}>
                {education.school} &middot; {education.period}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
