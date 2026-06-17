'use client';

import { useRef } from 'react';
import SectionHeading from '../../shared/SectionHeading';
import { useRevealAnimation } from '../../shared/useRevealAnimation';
import { profile, aboutFacts, education, languages } from '../../../lib/data';
import styles from './About.module.css';

export default function About() {
  const sectionRef = useRef(null);
  useRevealAnimation(sectionRef);

  // References for 3D card elements
  const bioCardRef = useRef(null);
  const credentialsCardRef = useRef(null);
  const educationCardRef = useRef(null);
  const languagesCardRef = useRef(null);

  const handleMouseMove = (e, cardRef) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Rotate max 8 degrees for a subtle, premium look
    const rotateX = ((y - centerY) / centerY) * 8;
    const rotateY = -((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    const glossX = (x / rect.width) * 100;
    const glossY = (y / rect.height) * 100;
    card.style.setProperty('--gloss-x', `${glossX}%`);
    card.style.setProperty('--gloss-y', `${glossY}%`);
  };

  const handleMouseLeave = (cardRef) => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.setProperty('--gloss-x', '50%');
    card.style.setProperty('--gloss-y', '50%');
  };

  return (
    <section ref={sectionRef} id="about" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="About Me"
          title="The Developer Behind the Screen"
          description="Crafting production-ready solutions and automating workflows."
        />

        <div className={styles.grid}>
          {/* Card 1: Biography & Vision (Large Hero Card) */}
          <div
            ref={bioCardRef}
            className={`${styles.card} ${styles.bioCard} reveal`}
            onMouseMove={(e) => handleMouseMove(e, bioCardRef)}
            onMouseLeave={() => handleMouseLeave(bioCardRef)}
          >
            <div className={styles.cardGlow} />
            <h3 className={styles.cardTitle}>Who I Am</h3>
            <p className={styles.summaryLead}>{profile.summary}</p>
            <p className={styles.summaryBody}>
              My development philosophy centers on core fundamentals — data structures, algorithms, and modular design.
              I focus on writing self-documenting code that is maintainable, scalable, and built to last.
              Beyond technical tasks, I coordinate communication and lead mentorship sessions for junior trainees,
              guiding them in debugging techniques and MERN stack practices.
            </p>
            <div className={styles.quoteBlock}>
              <span className={styles.quoteMark}>“</span>
              <p className={styles.quoteText}>
                Good developers write code that machines can understand. Great developers write code that humans can maintain.
              </p>
            </div>
          </div>

          {/* Card 2: Key Credentials / Fast Facts */}
          <div
            ref={credentialsCardRef}
            className={`${styles.card} ${styles.factsCard} reveal`}
            onMouseMove={(e) => handleMouseMove(e, credentialsCardRef)}
            onMouseLeave={() => handleMouseLeave(credentialsCardRef)}
          >
            <div className={styles.cardGlow} />
            <h3 className={styles.cardTitle}>Quick Stats</h3>
            <ul className={styles.factsList}>
              {aboutFacts.map((fact) => (
                <li key={fact.label} className={styles.factRow}>
                  <span className={styles.factLabel}>{fact.label}</span>
                  <span className={styles.factValue}>{fact.value}</span>
                </li>
              ))}
            </ul>
            <div className={styles.credentialsBadge}>
              <div className={styles.badgePulse} />
              <span className={styles.badgeLabel}>Available for Contracts</span>
            </div>
          </div>

          {/* Card 3: Education */}
          <div
            ref={educationCardRef}
            className={`${styles.card} ${styles.educationCard} reveal`}
            onMouseMove={(e) => handleMouseMove(e, educationCardRef)}
            onMouseLeave={() => handleMouseLeave(educationCardRef)}
          >
            <div className={styles.cardGlow} />
            <h3 className={styles.cardTitle}>Education</h3>
            <div className={styles.educationInfo}>
              <div className={styles.educationTimelineNode} />
              <span className={styles.educationPeriod}>{education.period}</span>
              <h4 className={styles.degree}>{education.degree}</h4>
              <p className={styles.school}>{education.school}</p>
            </div>
          </div>

          {/* Card 4: Languages Spoken */}
          <div
            ref={languagesCardRef}
            className={`${styles.card} ${styles.languagesCard} reveal`}
            onMouseMove={(e) => handleMouseMove(e, languagesCardRef)}
            onMouseLeave={() => handleMouseLeave(languagesCardRef)}
          >
            <div className={styles.cardGlow} />
            <h3 className={styles.cardTitle}>Languages Spoken</h3>
            <p className={styles.cardBlurb}>
              Proficient in communicating across diverse regional and global teams.
            </p>
            <div className={styles.languagePills}>
              {languages.map((lang, index) => (
                <div key={lang} className={styles.langBadge} style={{ '--index': index }}>
                  <span className={styles.langName}>{lang}</span>
                  <span className={styles.langIndicator} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
